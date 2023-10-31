import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
  Resolver,
} from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { printSchema } from 'graphql/utilities';
import { UpdateOneResolver } from '../../src';
import { Company } from '../fixtures/company.entity';
import { Group } from '../fixtures/group.entity';
import { User } from '../fixtures/user.entity';

@Resolver(() => User)
export class UpdateOneUserResolver extends UpdateOneResolver(User) {}

@Resolver(() => Company)
export class UpdateOneCompanyResolver extends UpdateOneResolver(Company) {}

@Resolver(() => Group)
export class UpdateOneGroupResolver extends UpdateOneResolver(Group) {}

describe('UpdateOneResolver', () => {
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [GraphQLSchemaBuilderModule],
    }).compile();
  });

  it('should generate graphql schema for UpdateOneUserResolver', async () => {
    const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
    const schema = await gqlSchemaFactory.create([UpdateOneUserResolver], {
      skipCheck: true, //to avoid QueryRoot type must be provided error
    });
    expect(printSchema(schema)).toMatchSnapshot();
  });

  it('should generate graphql schema for UpdateOneCompanyResolver', async () => {
    const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
    const schema = await gqlSchemaFactory.create([UpdateOneCompanyResolver], {
      skipCheck: true, //to avoid QueryRoot type must be provided error
    });
    expect(printSchema(schema)).toMatchSnapshot();
  });

  it('should generate graphql schema for UpdateOneGroupResolver', async () => {
    const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
    const schema = await gqlSchemaFactory.create([UpdateOneGroupResolver], {
      skipCheck: true, //to avoid QueryRoot type must be provided error
    });
    expect(printSchema(schema)).toMatchSnapshot();
  });
});
