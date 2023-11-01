import { Query, Resolver } from '@nestjs/graphql';
import request from 'supertest';
import { DeleteOneResolver } from '../../src';
import { User } from '../fixtures/user.entity';
import {
  TEST_TIMEOUT,
  TestContext,
  afterAllCallback,
  beforeAllCallback,
} from './utils';

jest.useRealTimers();

const gql = '/graphql';

@Resolver(() => User)
export class DeleteOneUserResolver extends DeleteOneResolver(User) {
  @Query(() => String)
  deleteOneUserResolver() {
    return 'dummy';
  }
}

describe('DeleteOneUser', () => {
  jest.setTimeout(TEST_TIMEOUT);
  let context: TestContext;

  beforeAll(async () => {
    context = await beforeAllCallback([DeleteOneUserResolver]);
  });

  afterAll(async () => {
    return afterAllCallback(context);
  });

  it('should create user', async () => {
    const httpServer = context.app.getHttpServer();
    const em = context.orm.em.fork();

    const user = em.create(User, { name: 'user' });
    await em.persistAndFlush(user);
    em.clear();

    await request(httpServer)
      .post(gql)
      .set('Accept', 'application/json')
      .send({
        query: `
          mutation DeleteOneUser($where: EntityIdInput) {
            deleteOneUser(where: $where) {
              name
            }
          }`,
        variables: { where: { id: user.id } },
        operationName: 'DeleteOneUser',
      })
      .expect(200)
      .expect((res) => expect(res.error).toBeFalsy())
      .expect((res) => {
        expect(res.body.data.deleteOneUser).toMatchSnapshot();
      });

    const notExistingUser = await em.findOne(User, { name: 'user' });
    expect(notExistingUser).toBeNull();
  }, 60000);
});
