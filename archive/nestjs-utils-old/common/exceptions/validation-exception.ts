import { ApplicationException } from './application.exception';

export type ValidationViolation = Record<string, string[]>;

export class ValidationException extends ApplicationException {
  violations: ValidationViolation[] = [];

  constructor(message: string, violations: ValidationViolation[]) {
    super(message);
    this.violations = violations;
  }
}
