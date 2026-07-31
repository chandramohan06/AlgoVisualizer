import { ILanguageStrategy } from '../judge.types';
import { JavaExecutionStrategy } from './JavaExecutionStrategy';
import { CppExecutionStrategy } from './CppExecutionStrategy';
import { PythonExecutionStrategy } from './PythonExecutionStrategy';
import { JavaScriptExecutionStrategy } from './JavaScriptExecutionStrategy';
import { AppError } from '../../../utils/AppError';

export class LanguageStrategyFactory {
  public static getStrategy(language: string): ILanguageStrategy {
    const lang = (language || '').toLowerCase().trim();

    switch (lang) {
      case 'java':
        return new JavaExecutionStrategy();
      case 'cpp':
      case 'c++':
        return new CppExecutionStrategy();
      case 'python':
      case 'py':
        return new PythonExecutionStrategy();
      case 'javascript':
      case 'js':
        return new JavaScriptExecutionStrategy();
      default:
        throw new AppError(
          `Unsupported language: '${language}'. Supported languages are: java, cpp, python, javascript.`,
          400
        );
    }
  }
}
