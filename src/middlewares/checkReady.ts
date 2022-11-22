import { Request, Response, NextFunction } from 'express';
import { localCacheAdapter } from '../adapters';

export const checkReady = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const ready = await localCacheAdapter.get('whatsapp-ready');
    if (ready !== true) {
      return res.status(500).json({
        ok: false,
        message: 'El bot no esta listo para funcionar 🥴, ve a /qr y escanealo!',
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};
