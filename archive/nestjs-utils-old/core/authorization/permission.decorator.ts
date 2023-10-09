import {
  applyDecorators,
  CustomDecorator,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import {
  PermissionAction,
  PermissionSubjectType,
} from '../../common/interfaces/authorization/types';
import { PermissionsGuard } from './permission.guard';

// action, subject tuple
export type RequiredPermission = [PermissionAction, PermissionSubjectType];
export const PERMISSION_CHECKER_KEY = 'permission_checker_params_key';
const CheckPermissionsInternal = (
  ...params: RequiredPermission[]
): CustomDecorator<string> => SetMetadata(PERMISSION_CHECKER_KEY, params);

export const CheckPermissions = (...params: RequiredPermission[]) =>
  applyDecorators(
    UseGuards(PermissionsGuard),
    CheckPermissionsInternal(...params),
  );
