import path from 'path';
import dotenv from 'dotenv';
import * as yup from 'yup';

dotenv.config({ path: path.join(__dirname, '../../.env') });

export const config = {
  NODE_ENV: process.env.NODE_ENV as string,
  AUTH_TOKEN: process.env.AUTH_TOKEN as string,
  SERVER_PORT: (process.env.SERVER_PORT ?? '3000') as string,
};

const validationSchema = yup.object().shape({
  NODE_ENV: yup.string().oneOf(['development', 'production']).default('development'),
  AUTH_TOKEN: yup.string().required(),
  SERVER_PORT: yup.string().required(),
});

export const validateConfig = () => {
  const isValid = validationSchema.isValidSync(config);
  if (!isValid) throw new Error('Invalid config provided');
};
