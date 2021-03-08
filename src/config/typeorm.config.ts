import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'abc123123',
  database: 'task-manager',
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: true,
  cli: {
    entitiesDir: `${__dirname}/../**/*.entity.ts`,
  },
};
