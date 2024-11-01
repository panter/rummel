import { Query, Resolver } from '@nestjs/graphql';
import request from 'supertest';
import { FindManyResolver } from '../../src';
import { User } from '../fixtures/user.entity';
import {
  TEST_TIMEOUT,
  TestContext,
  afterEachCallback,
  beforeEachCallback,
} from './utils';

jest.useRealTimers();

const gql = '/graphql';

@Resolver(() => User)
export class FindOneUserResolver extends FindManyResolver(User) {
  @Query(() => String)
  findManyUserResolver() {
    return 'dummy';
  }
}

describe('FindManyUser', () => {
  jest.setTimeout(TEST_TIMEOUT);

  let context: TestContext;

  beforeEach(async () => {
    context = await beforeEachCallback([FindOneUserResolver]);
  });

  afterEach(async () => {
    return afterEachCallback(context);
  });

  it(
    'should find all users when provided not query',
    async () => {
      const httpServer = context.app.getHttpServer();
      const em = context.orm.em.fork();

      const user1 = em.create(User, {
        name: 'user1',
      });
      const user2 = em.create(User, {
        name: 'user2',
      });
      await em.persistAndFlush(user1);
      await em.persistAndFlush(user2);

      em.clear();

      await request(httpServer)
        .post(gql)
        .set('Accept', 'application/json')
        .send({
          query: `
          query FindManyUser {
            users {
              name
            }
          }`,
          operationName: 'FindManyUser',
        })
        .expect(200)
        .expect((res) => expect(res.error).toBeFalsy())
        .expect((res) => {
          expect(res.body.data.users).toMatchSnapshot();
        });
    },
    TEST_TIMEOUT,
  );
});
