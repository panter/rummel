import { NextFunction, Request, Response } from 'express';
import { AppStorage } from '../utils/als/storage';
import { v4 } from 'uuid';

const X_CORRELATION_ID_HEADER = 'X-Correlation-Id';

export function asyncLocalStorageMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const correlationId = req.get(X_CORRELATION_ID_HEADER) || v4();
  res.header(X_CORRELATION_ID_HEADER, correlationId);
  return AppStorage.getAls().run(new AppStorage(correlationId), () => {
    return next();
  });
}
