import { applyDecorators, CustomDecorator, SetMetadata, UseGuards } from '@nestjs/common';

import { PermissionsGuard } from './permission.guard';
import { PermissionAction } from './interfaces';
import { PermissionSubjectType } from './interfaces/types';

// action, subject tuple
export type RequiredPermission = [PermissionAction, PermissionSubjectType];
export const PERMISSION_CHECKER_KEY = 'permission_checker_params_key';
const CheckPermissionsInternal = (
  ...params: RequiredPermission[]
): CustomDecorator<string> => SetMetadata(PERMISSION_CHECKER_KEY, params);

export const CheckPermissions = (...params: RequiredPermission[]) =>
  applyDecorators(
    CheckPermissionsInternal(...params),
    UseGuards(PermissionsGuard),
  );
