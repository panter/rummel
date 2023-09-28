import { CreateOneResolver } from '../../src';
import { User } from './user.entity';
import { Resolver } from '@nestjs/graphql';

Resolver(() => User);

@Resolver(() => User)
export class CreateOneUserResolver extends CreateOneResolver(User) {}
