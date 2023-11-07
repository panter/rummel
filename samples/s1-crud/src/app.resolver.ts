import { Resolver } from '@nestjs/graphql';
import {
  CreateOneResolver,
  DeleteOneResolver,
  FindManyResolver,
  FindOneResolver,
  UpdateOneResolver,
} from '@panter/crud';
import { Person } from './entities/person.entity';
import { AppUser } from './entities/app-user.entity';
import { CheckPermissions, CrudPermissionAction } from './authorization';

/*
 * to demonstrate casl authorization of reading only self
 */
@Resolver()
@CheckPermissions([CrudPermissionAction.READ, AppUser.name])
export class FinOneUserResolver extends FindOneResolver(AppUser) {}

@Resolver()
export class FinOnePersonResolver extends FindOneResolver(Person) {}

@Resolver()
export class FindManyPersonResolver extends FindManyResolver(Person) {}

@Resolver()
export class CreateOnePersonResolver extends CreateOneResolver(Person) {}

@Resolver()
export class UpdateOnePersonResolver extends UpdateOneResolver(Person) {}

@Resolver()
export class DeleteOnePersonResolver extends DeleteOneResolver(Person) {}
