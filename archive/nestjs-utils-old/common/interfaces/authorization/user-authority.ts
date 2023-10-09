export interface UserAuthority {
  getUserAuthorityId(): string;
  updateRole(newRole: any): void;
}
