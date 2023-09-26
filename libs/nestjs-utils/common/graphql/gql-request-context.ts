import express from 'express';
import { ExpressContextFunctionArgument } from '@apollo/server/express4';

export class GqlRequestContext implements ExpressContextFunctionArgument {
  req!: express.Request;
  res!: express.Response;
}
