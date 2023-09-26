import { Factory, Faker } from '@mikro-orm/seeder';
import { v4 } from 'uuid';
import { User } from '../../apps/api/src/modules/user-identity';

export class UserFactory extends Factory<User> {
  model = User;

  definition(faker: Faker): Partial<User> {
    return {
      id: v4(),
      createdAt: new Date(),
    };
  }
}
