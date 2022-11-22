/**
 * Middleware to authenticate using the root authentication token
 */

import { Request, Response, NextFunction } from 'express';
import { config } from '../config';

export const tokenAuthenticated = (req: Request, res: Response, next: NextFunction): any => {
  if (req.headers.authorization == null) {
    return res.status(403).json({ error: 'Bearer token not provided' });
  }

  const token = req.headers.authorization.replace('Bearer ', '').replace('bearer ', '').trim();

  if (token !== config.AUTH_TOKEN) {
    return res.status(403).json({ error: 'Incorrect server token' });
  }

  next();
};
