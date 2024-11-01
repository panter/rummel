import { Query, Resolver } from '@nestjs/graphql';
import request from 'supertest';
import { FindOneResolver } from '../../src';
import { User } from '../fixtures/user.entity';
import {
  afterEachCallback,
  beforeEachCallback,
  TEST_TIMEOUT,
  TestContext,
} from './utils';

jest.useRealTimers();

const gql = '/graphql';

@Resolver(() => User)
export class FindOneUserResolver extends FindOneResolver(User) {
  @Query(() => String)
  findOneUserResolver() {
    return 'dummy';
  }
}

describe('FindOneUser', () => {
  jest.setTimeout(TEST_TIMEOUT);

  let context: TestContext;

  beforeEach(async () => {
    context = await beforeEachCallback([FindOneUserResolver]);
  });

  afterEach(async () => {
    return afterEachCallback(context);
  });

  it('should find a user', async () => {
    const httpServer = context.app.getHttpServer();
    const em = context.orm.em.fork();

    const user = em.create(User, {
      name: 'user',
      address: { street: 'street' },
    });
    await em.persistAndFlush(user);
    em.clear();

    await request(httpServer)
      .post(gql)
      .set('Accept', 'application/json')
      .send({
        query: `
          query FindOneUser($where: EntityIdInput) {
            user(where: $where) {
              name
            }
          }`,
        variables: { where: { id: user.id } },
        operationName: 'FindOneUser',
      })
      .expect(200)
      .expect((res) => expect(res.error).toBeFalsy())
      .expect((res) => {
        expect(res.body.data.user).toMatchSnapshot();
      });
  }, 60000);
});
