/**
 * Base error for all other errors used in application
 * Extending application error simplifies error handling and reporting
 */
export abstract class ApplicationException extends Error {
  cause?: unknown;
  context?: Record<string, any>;
  /**
   * DO NOT PROPAGATE TO CLIENT
   */
  internalContext?: Record<string, any>;

  protected constructor(message: string, cause?: unknown) {
    super(message);
    this.cause = cause;
    this.name = this.constructor.name;
  }

  withContext(context: Record<string, any>) {
    this.context = {
      ...(this.context || {}),
      ...context,
    };
    return this;
  }

  withInternalContext(context: Record<string, any>) {
    this.internalContext = {
      ...(this.internalContext || {}),
      ...context,
    };
    return this;
  }
}
