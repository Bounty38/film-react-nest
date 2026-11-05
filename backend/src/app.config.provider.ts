import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const CONFIG = 'CONFIG';

type Driver = 'postgres';

const DEFAULT_PG_PORT = 5432;

const parseDriver = (value: string): Driver => {
  if (value !== 'postgres') {
    throw new Error(`Неподдерживаемый DATABASE_DRIVER: ${value}`);
  }
  return value;
};

export const AppConfigProvider = {
  imports: [ConfigModule.forRoot()],
  provide: CONFIG,
  inject: [ConfigService],
  useFactory: (configService: ConfigService): AppConfig => {
    // Адрес и имя базы берём из DATABASE_URL, логин и пароль — из отдельных
    // переменных (если оставить их в url, драйвер затрёт их пустыми).
    const url = new URL(configService.getOrThrow<string>('DATABASE_URL'));

    return {
      database: {
        driver: parseDriver(
          configService.getOrThrow<string>('DATABASE_DRIVER'),
        ),
        host: url.hostname,
        port: url.port ? Number(url.port) : DEFAULT_PG_PORT,
        dbname: url.pathname.slice(1),
        username: configService.getOrThrow<string>('DATABASE_USERNAME'),
        password: configService.getOrThrow<string>('DATABASE_PASSWORD'),
      },
    };
  },
};

@Module({
  providers: [AppConfigProvider],
  exports: [AppConfigProvider],
})
export class AppConfigModule {}

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: Driver;
  host: string;
  port: number;
  dbname: string;
  username: string;
  password: string;
}
