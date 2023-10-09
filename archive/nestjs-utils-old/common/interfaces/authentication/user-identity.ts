export interface UserIdentity {
  id: string;

  getTenantId(): string;

  getRole(): string;

  markAsVerified(): void;

  getUserAuthorityId(): string;
}
