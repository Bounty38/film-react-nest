import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'node:path';

import { AppConfig, AppConfigModule, CONFIG } from './app.config.provider';
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [CONFIG],
      useFactory: ({ database }: AppConfig) => ({
        type: database.driver,
        host: database.host,
        port: database.port,
        database: database.dbname,
        username: database.username,
        password: database.password,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), 'public', 'content', 'afisha'),
      serveRoot: '/content/afisha',
      serveStaticOptions: { index: false },
    }),
    FilmsModule,
    OrderModule,
  ],
})
export class AppModule {}
