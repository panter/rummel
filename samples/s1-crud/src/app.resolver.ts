import { Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import {
  CreateOneResolver,
  DeleteOneResolver,
  FindManyResolver,
  FindOneResolver,
  UpdateOneResolver,
} from '@panter/crud';

@Resolver()
export class FinOneUserResolver extends FindOneResolver(User) {}

@Resolver()
export class FindManyUserResolver extends FindManyResolver(User) {}

@Resolver()
export class CreateOneUserResolver extends CreateOneResolver(User) {}

@Resolver()
export class UpdateOneUserResolver extends UpdateOneResolver(User) {}

@Resolver()
export class DeleteOneUserResolver extends DeleteOneResolver(User) {}
