import { IProblemMetadata, IProblemParameter } from '../judge.types';

export class MetadataExtractor {
  public static extractMetadata(
    code: string,
    explicitMetadata?: Partial<IProblemMetadata> | null,
    starterCode?: string
  ): IProblemMetadata {
    if (
      explicitMetadata &&
      explicitMetadata.functionName &&
      explicitMetadata.returnType &&
      explicitMetadata.parameters &&
      explicitMetadata.parameters.length > 0
    ) {
      return {
        functionName: explicitMetadata.functionName,
        returnType: explicitMetadata.returnType,
        parameters: explicitMetadata.parameters as IProblemParameter[],
        mutateParamName: explicitMetadata.mutateParamName,
      };
    }

    const sourceToInspect = code && code.trim().length > 0 ? code : starterCode || '';

    // 1. If Python code (contains `def `), try Python Signature Extraction first
    if (sourceToInspect.includes('def ')) {
      const pyMatch = sourceToInspect.match(/def\s+(\w+)\s*\(\s*self\s*,?\s*([^)]*)\)\s*(?:->\s*([\w<>[\]=None]+))?:/);
      if (pyMatch) {
        const functionName = pyMatch[1].trim();
        const paramsRaw = pyMatch[2].trim();
        const pyReturnTypeRaw = pyMatch[3] ? pyMatch[3].trim() : 'Any';
        const parameters = this.parsePythonParameters(paramsRaw);

        let returnType = 'Any';
        const normRet = pyReturnTypeRaw.toLowerCase();
        if (normRet === 'none') {
          returnType = 'void';
        } else if (normRet.includes('listnode')) {
          returnType = 'ListNode';
        } else if (normRet.includes('treenode')) {
          returnType = 'TreeNode';
        } else if (normRet.includes('list[int]') || normRet.includes('list[str]') || normRet.includes('list[')) {
          returnType = 'int[]';
        } else if (normRet.includes('bool')) {
          returnType = 'boolean';
        } else if (normRet.includes('int')) {
          returnType = 'int';
        }

        const mutateParamName = returnType === 'void' && parameters.length > 0 ? parameters[0].name : undefined;

        return {
          functionName,
          returnType,
          parameters,
          mutateParamName,
        };
      }
    }

    // 2. Try Java / C++ Signature Extraction
    const javaCppMatch = sourceToInspect.match(
      /(?:public\s+|private\s+|protected\s+)?([\w<>[\]]+)\s+(\w+)\s*\(([^)]*)\)/
    );

    if (javaCppMatch && javaCppMatch[1] !== 'def' && javaCppMatch[2] !== 'main' && javaCppMatch[2] !== 'Solution') {
      const returnType = javaCppMatch[1].trim();
      const functionName = javaCppMatch[2].trim();
      const paramsRaw = javaCppMatch[3].trim();
      const parameters = this.parseJavaCppParameters(paramsRaw);

      const mutateParamName = returnType === 'void' && parameters.length > 0 ? parameters[0].name : undefined;

      return {
        functionName,
        returnType,
        parameters,
        mutateParamName,
      };
    }

    // 3. Fallback Default Signature
    return {
      functionName: 'solve',
      returnType: 'Any',
      parameters: [
        { name: 'arg0', type: 'Any' },
        { name: 'arg1', type: 'Any' },
      ],
    };
  }

  private static parseJavaCppParameters(paramsRaw: string): IProblemParameter[] {
    if (!paramsRaw || !paramsRaw.trim()) return [];
    const params: IProblemParameter[] = [];
    const parts = paramsRaw.split(',');

    for (const part of parts) {
      const trimmed = part.trim().replace(/final\s+/, '').replace(/const\s+/, '').replace(/&/g, '').trim();
      if (!trimmed) continue;

      const tokens = trimmed.split(/\s+/);
      if (tokens.length >= 2) {
        const type = tokens.slice(0, tokens.length - 1).join(' ');
        const name = tokens[tokens.length - 1];
        params.push({ name, type });
      } else {
        params.push({ name: tokens[0], type: 'Any' });
      }
    }

    return params;
  }

  private static parsePythonParameters(paramsRaw: string): IProblemParameter[] {
    if (!paramsRaw || !paramsRaw.trim()) return [];
    const params: IProblemParameter[] = [];
    const parts = paramsRaw.split(',');

    for (const part of parts) {
      const trimmed = part.trim();
      if (!trimmed) continue;

      if (trimmed.includes(':')) {
        const [name, type] = trimmed.split(':').map((s) => s.trim());
        params.push({ name, type: this.mapPythonType(type) });
      } else {
        params.push({ name: trimmed, type: 'Any' });
      }
    }

    return params;
  }

  private static mapPythonType(pyType: string): string {
    if (pyType.includes('List[str]')) return 'char[]';
    if (pyType.includes('List[int]')) return 'int[]';
    if (pyType.includes('List[List[int]]')) return 'int[][]';
    if (pyType.includes('List[List[str]]')) return 'char[][]';
    if (pyType.includes('ListNode')) return 'ListNode';
    if (pyType.includes('TreeNode')) return 'TreeNode';
    if (pyType.includes('int')) return 'int';
    if (pyType.includes('bool')) return 'boolean';
    if (pyType.includes('str')) return 'String';
    return 'Any';
  }
}
