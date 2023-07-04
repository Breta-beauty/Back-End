import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

import { config } from 'dotenv';
config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  database: configService.get('POSTGRES_DB'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  ssl: true,
  synchronize: true,

  migrations: ['dist/migrations/*.{ts,js}'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
