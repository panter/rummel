export interface UserIdentity {
  id: string;

  getTenantId(): string;

  getRole(): string;

  markAsVerified(): void;

  /**
   * A unique, real-world identifier (e.g., email, phone number) used for authentication or user identification
   */
  getUserNaturalKey(): string;

  getPersonalToken(): string | undefined;
}
