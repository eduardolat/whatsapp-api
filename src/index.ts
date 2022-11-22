import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';

import { expressErrorHandler } from './middlewares';
import { bootstrapWhatsappClient } from './bootstrapWhatsappClient';
import { config, validateConfig } from './config';

const bootstrap = async (): Promise<void> => {
  validateConfig();

  const app = express();

  app.use(cors());
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.set('views', path.join(__dirname, '../src/views'));
  app.set('view engine', 'ejs');

  // Bootstrap whatsapp web client
  bootstrapWhatsappClient(app);
  //

  app.use(expressErrorHandler);

  app.listen(config.SERVER_PORT, () => {
    console.log('---');
    console.log(`Servidor iniciado: http://localhost:${config.SERVER_PORT}`);
    console.log('---');
  });
};

bootstrap().catch(console.error);
