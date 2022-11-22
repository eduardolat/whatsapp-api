/**
 * Middleware to throw error if the request is not valid
 * using express-validator to reduce boilerplate
 */

import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validateExpressValidator = (req: Request, res: Response, next: NextFunction): any => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};
