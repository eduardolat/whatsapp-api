/**
 * Middleware to handle and print errors
 */

import { Request, Response, NextFunction } from 'express';
import { serializeError } from '../helpers';
import { config } from '../config';
import _ from 'lodash';

export const expressErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  if (res.headersSent) {
    return next(err);
  }

  const jsonError = serializeError(err);

  if (config.NODE_ENV === 'production') {
    res.status(500).json(_.omit(jsonError, ['stack']));
  } else {
    res.status(500).json(jsonError);
  }
};
