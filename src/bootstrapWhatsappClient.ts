import express from 'express';
import { Client, NoAuth } from 'whatsapp-web.js';

import { localCacheAdapter } from './adapters';

import { bootstrapRouter } from './controllers/router';

export const bootstrapWhatsappClient = (app: express.Application) => {
  // Route to get QR code
  app.get('/qr', async (req, res) => {
    const exists = await localCacheAdapter.has('whatsapp-qr-code');

    if (exists) {
      const qr = await localCacheAdapter.get('whatsapp-qr-code');
      return res.status(200).render('qrcode', { qr });
    }

    return res.status(200).send('Ya existe una sesion iniciada o aun se esta inicializando');
  });
  //

  const client = new Client({
    puppeteer: {
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
    authStrategy: new NoAuth(),
  });

  client.on('qr', async qr => {
    await localCacheAdapter.set('whatsapp-ready', false);
    await localCacheAdapter.set('whatsapp-qr-code', qr);
    console.log('Codigo QR refrescado');
  });

  client.on('disconnected', async () => {
    await localCacheAdapter.set('whatsapp-ready', false);
    console.log('El cliente se desconecto :c');
  });

  client.on('ready', async () => {
    await localCacheAdapter.del('whatsapp-qr-code');
    await localCacheAdapter.set('whatsapp-ready', true);
    bootstrapRouter(app, client);
    console.log('El cliente esta listo!');
  });

  console.log('Inicializando cliente...');
  client.initialize();
};
