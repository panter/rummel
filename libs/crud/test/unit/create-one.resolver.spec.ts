import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
  Resolver,
} from '@nestjs/graphql';
import { printSchema } from 'graphql/utilities';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../fixtures/user.entity';
import { CreateOneResolver } from '../../src';
import {
  CREATE_ONE_COMPANY_GQL_SCHEMA,
  CREATE_ONE_GROUP_GQL_SCHEMA,
  CREATE_ONE_USER_GQL_SCHEMA,
} from './fixtures/create-one.resolver.fixtures';
import { Company } from '../fixtures/company.entity';
import { Group } from '../fixtures/group.entity';

@Resolver(() => User)
export class CreateOneUserResolver extends CreateOneResolver(User) {}

@Resolver(() => Company)
export class CreateOneCompanyResolver extends CreateOneResolver(Company) {}

@Resolver(() => Group)
export class CreateOneGroupResolver extends CreateOneResolver(Group) {}

describe('CreateOneResolver', () => {
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [GraphQLSchemaBuilderModule],
    }).compile();
  });

  it('should generate graphql schema for CreateOneUserResolver', async () => {
    const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
    const schema = await gqlSchemaFactory.create([CreateOneUserResolver], {
      skipCheck: true, //to avoid QueryRoot type must be provided error
    });
    expect(printSchema(schema)).toEqual(CREATE_ONE_USER_GQL_SCHEMA);
  });

  it('should generate graphql schema for CreateOneCompanyResolver', async () => {
    const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
    const schema = await gqlSchemaFactory.create([CreateOneCompanyResolver], {
      skipCheck: true, //to avoid QueryRoot type must be provided error
    });
    expect(printSchema(schema)).toEqual(CREATE_ONE_COMPANY_GQL_SCHEMA);
  });

  it('should generate graphql schema for CreateOneGroupResolver', async () => {
    const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
    const schema = await gqlSchemaFactory.create([CreateOneGroupResolver], {
      skipCheck: true, //to avoid QueryRoot type must be provided error
    });
    expect(printSchema(schema)).toEqual(CREATE_ONE_GROUP_GQL_SCHEMA);
  });
});
