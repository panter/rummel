import dotenv from 'dotenv';
import { builder } from './builder.js';
import { printSchema, lexicographicSortSchema } from 'graphql';
import { writeFileSync } from 'fs';

import './modules/index.js';
import path from 'path';
import { __dirname } from '../routes/index.js';

export const schema = builder.toSchema();
const schemaAsString = printSchema(lexicographicSortSchema(schema));

if (process.env.ENV_SHORT === 'local') {
  writeFileSync(
    path.join(__dirname, '..', '..', 'schema.graphql'),
    schemaAsString,
  );
}
