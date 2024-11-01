import * as request from 'supertest';
import { TestContext, afterEachCallback, beforeEachCallback } from './utils';
import { FindOneUserResolver } from '../src/app.resolver';

describe('AppController (e2e)', () => {
  let context: TestContext;

  beforeEach(async () => {
    context = await beforeEachCallback([FindOneUserResolver]);
  });

  afterEach(async () => {
    return afterEachCallback(context);
  });

  it('/ (GET)', () => {
    return request(context.app.getHttpServer()).get('/').expect(404);
  });
});
