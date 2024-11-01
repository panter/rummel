import { Query, Resolver } from '@nestjs/graphql';
import request from 'supertest';
import { UpdateOneResolver } from '../../src';
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
export class UpdateOneUserResolver extends UpdateOneResolver(User) {
  @Query(() => String)
  updateOneUserResolverQuery() {
    return 'dummy';
  }
}

describe('UpdateOneUser', () => {
  jest.setTimeout(TEST_TIMEOUT);

  let context: TestContext;

  beforeEach(async () => {
    context = await beforeEachCallback([UpdateOneUserResolver]);
  });

  afterEach(async () => {
    return afterEachCallback(context);
  });

  it('should update user', async () => {
    const httpServer = context.app.getHttpServer();
    const em = context.orm.em.fork();

    const gor = em.create(User, {
      name: 'gor',
      address: { street: 'street' },
    });
    await em.persistAndFlush(gor);

    await request(httpServer)
      .post(gql)
      .set('Accept', 'application/json')
      .send({
        query: `mutation UpdateOneUser($data: UserUpdateInput, $where: EntityIdInput!) {
            updateOneUser(where:$where data: $data) {
              name
              address {
                street
              }
            }
          }`,
        variables: {
          where: { id: gor.id },
          data: {
            name: { set: 'my name' },
            address: {
              street: { set: 'my street' },
            },
          },
        },
        operationName: 'UpdateOneUser',
      })
      .expect(200)
      .expect((res) => expect(res.error).toBeFalsy())
      .expect((res) => {
        expect(res.body.data.updateOneUser).toMatchSnapshot();
      });
  }, 60000);
});
