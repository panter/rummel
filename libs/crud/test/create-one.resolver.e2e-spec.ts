import { NestFactory } from '@nestjs/core';
import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
} from '@nestjs/graphql';
import { INestApplication } from '@nestjs/common';
import { printSchema } from 'graphql/utilities';
import { CreateOneUserResolver } from './fixtures/user.resolver';
import path from 'path';
import * as fs from 'fs';

describe('CreateOneResolver', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await NestFactory.create(GraphQLSchemaBuilderModule);
    await app.init();
  });

  it('should be defined', async () => {
    const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
    const schema = await gqlSchemaFactory.create([CreateOneUserResolver], {
      skipCheck: true, //to avoid QueryRoot type must be provided error
    });
    const expectedSchema = fs.readFileSync(
      path.join(__dirname, 'fixtures', 'create-one.result.graphql'),
      'utf-8',
    );
    expect(printSchema(schema)).toEqual(expectedSchema);
  });

  afterAll(async () => {
    await app.close();
  });
});