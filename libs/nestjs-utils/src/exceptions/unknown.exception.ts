import { ApplicationException } from './application.exception';

/**
 * For unexpected errors
 *
 * Example:
 * ```ts
 * try {
 *   // something that throws
 * } catch (e)
 * if (e instanceof InvalidEmailException) {
 *   // handle invalid email
 * } else {
 *   throw new UnknownException("Unknown exception during user registration", e)
 * }
 * ```
 */
export class UnknownException extends ApplicationException {
  constructor(message: string, cause?: unknown) {
    super(message, cause);
  }
}
