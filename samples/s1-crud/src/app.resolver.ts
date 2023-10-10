import { Resolver } from '@nestjs/graphql';
import {
  CreateOneResolver,
  DeleteOneResolver,
  FindManyResolver,
  FindOneResolver,
  UpdateOneResolver,
} from '@panter/crud';
import { Person } from './entities/person.entity';

@Resolver()
export class FinOneUserResolver extends FindOneResolver(Person) {}

@Resolver()
export class FindManyUserResolver extends FindManyResolver(Person) {}

@Resolver()
export class CreateOneUserResolver extends CreateOneResolver(Person) {}

@Resolver()
export class UpdateOneUserResolver extends UpdateOneResolver(Person) {}

@Resolver()
export class DeleteOneUserResolver extends DeleteOneResolver(Person) {}
