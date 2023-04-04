import { config } from 'dotenv';

config();
const configEnv = process.env;

export const database_config = {
  TYPE: configEnv.DB_TYPE || 'mysql',
  HOST: configEnv.DB_HOST || '',
  USERNAME: configEnv.DB_USERNAME || '',
  PASSWORD: configEnv.DB_PASSWORD || '',
  DATABASE: configEnv.DB_NAME || '',
  PORT: +configEnv.DB_PORT || 3306,
};

export const jwt_config = {
  SECRET: configEnv.JWT_SECRET,
  EXPIRES_IN: configEnv.JWT_EXPIRED_IN,
};

