import { registerAs } from '@nestjs/config';

export const config = registerAs('config', () => {
  return {
    database: {
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT, 10),
      schemaAuth: process.env.DB_SCHEMA_AUTH,
      schemaCore: process.env.DB_SCHEMA_CORE,
      username: process.env.DB_USER,
    },
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
    port: parseInt(process.env.PORT, 10),
    defaultUser: {
      username: process.env.DEFAULT_USER_USERNAME,
      email: process.env.DEFAULT_USER_EMAIL,
      password: process.env.DEFAULT_USER_PASSWORD,
    },
  };
});
