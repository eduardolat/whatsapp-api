import { NextFunction, Request, Response } from 'express';
import { Client } from 'whatsapp-web.js';

export default async function sendMessageAction(
  req: Request,
  res: Response,
  next: NextFunction,
  client: Client,
): Promise<any> {
  try {
    const toNumber = req.body.toNumber.replace(/\D/g, '');
    const message = req.body.message;

    const numberDetails = await client.getNumberId(toNumber);

    if (!numberDetails) {
      return res.status(404).json({ ok: false, message: 'El número no esta registrado' });
    }

    await client.sendMessage(numberDetails._serialized, message);

    res.json({ ok: true, message: req.body.message });
  } catch (error) {
    next(error);
  }
}
