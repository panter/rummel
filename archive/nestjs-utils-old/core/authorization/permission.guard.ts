import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  PERMISSION_CHECKER_KEY,
  RequiredPermission,
} from './permission.decorator';
import { CaslAbilityFactory } from './csal-ability.factory';
import { getRequest } from '../../common';
import { AppAbility } from '../../common/interfaces/authorization/types';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions =
      this.reflector.get<RequiredPermission[]>(
        PERMISSION_CHECKER_KEY,
        context.getHandler(),
      ) || [];

    const request: any = getRequest(context);
    const user = request.user;
    if (!user) return false;

    const ability = await this.abilityFactory.createForUser(request?.user);
    request.ability = ability;

    return requiredPermissions.every((permission) =>
      this.isAllowed(ability, permission),
    );
  }

  private isAllowed(
    ability: AppAbility,
    permission: RequiredPermission,
  ): boolean {
    return ability.can(...permission);
  }
}
