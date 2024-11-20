import { registerAs } from '@nestjs/config';
import { config as configDotenv } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

configDotenv({ path: '.development.env' });
console.log(process.env.NODE_ENV);
let config = {};
if (process.env.NODE_ENV === 'production') {
  console.log('produccion');
  config = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist//*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    autoLoadEntities: true,
    logging: false,
    synchronize: true,
    ssl: {
      rejectUnauthorized: false,
    },
  };
} else {
  config = {
    type: 'postgres',
    database: process.env.DB_NAME_DEV,
    host: process.env.DB_HOST_DEV,
    port: parseInt(process.env.DB_PORT_DEV, 10),
    username: process.env.DB_USERNAME_DEV,
    password: process.env.DB_PASSWORD_DEV,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    autoLoadEntities: true,
    logging: true,
    synchronize: true,
    dropSchema: false,
  };
}

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
