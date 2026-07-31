import { ILanguageStrategy } from '../judge.types';
import { JavaExecutionStrategy } from './JavaExecutionStrategy';
import { CppExecutionStrategy } from './CppExecutionStrategy';
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
      default:
        throw new AppError(
          `Unsupported language: '${language}'. The Practice platform supports ONLY Java and C++.`,
          400
        );
    }
  }
}
