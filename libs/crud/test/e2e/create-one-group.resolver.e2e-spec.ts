import { Query, Resolver } from '@nestjs/graphql';
import request from 'supertest';
import { CreateOneResolver } from '../../src';
import { Group } from '../fixtures/group.entity';
import { User } from '../fixtures/user.entity';
import {
  TEST_TIMEOUT,
  TestContext,
  afterEachCallback,
  beforeEachCallback,
} from './utils';

jest.useRealTimers();

const gql = '/graphql';

@Resolver(() => Group)
export class CreateOneGroupResolver extends CreateOneResolver(Group) {
  @Query(() => String)
  createOneGroupResolver() {
    return 'dummy';
  }
}

describe('CreateOneGroup', () => {
  jest.setTimeout(TEST_TIMEOUT);
  //
  let context: TestContext;

  beforeEach(async () => {
    context = await beforeEachCallback([CreateOneGroupResolver]);
  });

  afterEach(async () => {
    return afterEachCallback(context);
  });

  it(
    'should create group',
    async () => {
      const httpServer = context.app.getHttpServer();
      const em = context.orm.em.fork();

      const cro = em.create(User, { name: 'cro' });
      const bbl = em.create(User, { name: 'bbl' });
      await em.persistAndFlush(cro);
      await em.persistAndFlush(bbl);

      await request(httpServer)
        .post(gql)
        .set('Accept', 'application/json')
        .send({
          query: `mutation CreateOneGroup($data: GroupCreateInput) {
            createOneGroup(data: $data) {
              name
              description
              founders {
                name
              }
            }
          }`,
          variables: {
            data: {
              name: 'manul',
              description: 'yeah',
              founders: {
                connect: [{ id: cro.id }, { id: bbl.id }],
              },
            },
          },
          operationName: 'CreateOneGroup',
        })
        .expect(200)
        .expect((res) => expect(res.error).toBeFalsy())
        .expect((res) => {
          expect(res.body.data.createOneGroup).toMatchSnapshot();
        });
    },
    TEST_TIMEOUT,
  );
});
