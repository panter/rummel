import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { CaslAbilityFactory } from './csal-ability.factory';

import { getRequest } from '@panter/nestjs-utils';
import {
  PERMISSION_CHECKER_KEY,
  RequiredPermission,
} from './permission.decorator';
import { AppAbility } from './interfaces/types';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride(
      PERMISSION_CHECKER_KEY,
      [context.getHandler(), context.getClass()],
    );
    const request: any = getRequest(context);
    const user = request.user;
    if (!user) return false;

    const ability = await this.abilityFactory.createForUser(request?.user);
    user.ability = ability;

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
