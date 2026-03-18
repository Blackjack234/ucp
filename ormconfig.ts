import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

let baseConfig: Partial<DataSourceOptions> = {
  synchronize: false,
  migrations: ['src/migration/*.ts'],
  migrationsTableName: 'migrations',
};

let dbConfig: DataSourceOptions;

switch (process.env.NODE_ENV) {
  case 'development':
    dbConfig = {
      ...baseConfig,
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['src/**/*.entity.ts'],
    } as DataSourceOptions;
    break;

  case 'test':
    dbConfig = {
      ...baseConfig,
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['src/**/*.entity.ts'],
    } as DataSourceOptions;
    break;

  case 'production':
    throw new Error('Production config not set up');
  default:
    throw new Error('Unknown Environment.');
}

export const AppDataSource = new DataSource(dbConfig);