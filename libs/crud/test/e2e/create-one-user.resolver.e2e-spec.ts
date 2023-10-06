import { Query, Resolver } from '@nestjs/graphql';
import { CreateOneResolver } from '../../src';
import { User } from '../fixtures/user.entity';

// const gql = '/graphql';

@Resolver(() => User)
export class CreateOneUserResolver extends CreateOneResolver(User) {
  @Query(() => String)
  dummyRootQuery() {
    return 'dummy';
  }
}

// describe('CreateOneUser', () => {
//   let context: TestContext;

//   beforeAll(async () => {
//     context = await beforeAllCallback();
//   });

//   afterAll(async () => {
//     return afterAllCallback(context);
//   });

//   it('should create user', async () => {
//     const httpServer = context.app.getHttpServer();
//     return request(httpServer)
//       .post(gql)
//       .set('Accept', 'application/json')
//       .send({
//         query:
//           'mutation CreateOneUser($data: UserCreateInput) {\n  createOneUser(data: $data) {\n    id\n    name\n  }\n}',
//         variables: { data: { name: 'bbl' } },
//         operationName: 'CreateOneUser',
//       })
//       .expect(200)
//       .expect((res) => expect(res.error).toBeFalsy())
//       .expect((res) => {
//         expect(res.body.data.createOneUser).toEqual({
//           id: 1,
//           name: 'bbl',
//         });
//       });
//   });
// });
