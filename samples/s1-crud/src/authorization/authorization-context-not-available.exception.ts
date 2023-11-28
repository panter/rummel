export class AuthorizationContextNotAvailableException extends Error {
  constructor() {
    super(
      `Authorization context not available. Did you forget to add the @CheckPermission() decorator to your resolver?`,
    );
  }
}
