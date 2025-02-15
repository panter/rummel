import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
  Resolver,
} from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { printSchema } from 'graphql/utilities';
import { FindOneResolver, ObjectRelationResolvers } from '../../src';
import { Group } from '../fixtures/group.entity';
import { Company } from '../fixtures/company.entity';

@Resolver(() => Group)
export class FindOneGroupResolver extends FindOneResolver(Group) {}

@Resolver(() => Company)
export class FindOneCompanyResolver extends FindOneResolver(Company) {}

describe('ObjectRelationResolver', () => {
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [GraphQLSchemaBuilderModule],
    }).compile();
  });

  it('should generate relation resolvers graphql schema', async () => {
    const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
    const schema = await gqlSchemaFactory.create(
      [
        FindOneGroupResolver,
        ...ObjectRelationResolvers(Group),
        FindOneCompanyResolver,
        ...ObjectRelationResolvers(Company),
      ],
      {
        skipCheck: true, //to avoid QueryRoot type must be provided error
      },
    );
    expect(printSchema(schema)).toMatchSnapshot();
  });
});
