import express, { Request } from 'express';
import { body } from 'express-validator';
import { Client } from 'whatsapp-web.js';
import { checkReady, tokenAuthenticated, validateExpressValidator } from '../middlewares';
import sendMessageAction from './sendMessage.action';

export const bootstrapRouter = (app: express.Application, client: Client) => {
  app.post(
    '/send-message',
    checkReady,
    body('toNumber').notEmpty(),
    body('message').notEmpty(),
    validateExpressValidator,
    tokenAuthenticated,
    (req, res, next) => sendMessageAction(req as Request, res, next, client),
  );
};
