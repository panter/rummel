import { Tenant } from './tenant.interface';

export interface TenantAware {
  getTenantId(): Tenant;

  hasSameTenant(other: TenantAware): boolean;
}
