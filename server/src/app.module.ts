import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validateEnv } from './helpers/env.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import createDataSource from './database/data-source';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { DataSource } from 'typeorm';
import { AdminModule } from './modules/admin/admin.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TokenModule } from './modules/token/token.module';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailModule } from './modules/mail/mail.module';
import { BullModule } from '@nestjs/bullmq';
import { ProductsModule } from './modules/products/products.module';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { CustomValidationPipe } from './helpers/validation.pipe';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        createDataSource(configService).options,
      dataSourceFactory: async (options) => {
        const logger = new Logger('Database');
        if (!options) throw new Error('Database options are undefined.');

        const pgOptions = options as PostgresConnectionOptions;
        const mainDataSource = new DataSource(pgOptions);

        const initResult = await mainDataSource
          .initialize()
          .then(() => ({ initialized: true, error: null }))
          .catch((error) => ({ initialized: false, error }));

        if (initResult.initialized) {
          logger.log('Data Source initialized');
          return mainDataSource;
        }

        if ((initResult.error as { code?: string })?.code === '3D000') {
          logger.warn(`Creating missing database: ${pgOptions.database}`);
          const tempDataSource = new DataSource({
            ...pgOptions,
            database: 'postgres',
            username: 'postgres',
            migrationsRun: false,
            synchronize: false,
          });

          await tempDataSource
            .initialize()
            .then(() => logger.log('Connected to postgres database'))
            .catch((error) => {
              logger.error('Connection to postgres failed', error);
              throw error;
            });

          await tempDataSource
            .query(
              `CREATE DATABASE "${pgOptions.database}" OWNER "${pgOptions.username}"`,
            )
            .then(() => logger.log(`Database ${pgOptions.database} created`))
            .catch((error) => {
              logger.error('Database creation failed', error);
              throw error;
            })
            .finally(() => {
              tempDataSource.destroy().catch(() => {});
            });

          return mainDataSource.initialize().then((ds) => {
            logger.log('Main Data Source initialized after creation');
            return ds;
          });
        }
        logger.error('Database initialization failed', initResult.error);
        throw initResult.error;
      },
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get<string>('QUEUE_HOST'),
          port: configService.get<number>('QUEUE_PORT'),
          ...(configService.get<string>('NODE_ENV') !== 'local' && {
            username: configService.get<string>('QUEUE_USERNAME'),
            password: configService.get<string>('QUEUE_PASSWORD'),
          }),
          stalledInterval: 300000,
          guardInterval: 300000,
          drainDelay: 300000,
        },
      }),
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('SMTP_HOST'),
          port: configService.get<number>('SMTP_PORT'),
          auth: {
            user: configService.get<string>('SMTP_USER'),
            pass: configService.get<string>('SMTP_PASS'),
          },
        },
        defaults: {
          from: `"Shopco" <${configService.get<string>('SMTP_FROM')}>`,
        },
        template: {
          dir: __dirname + '/modules/mail/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
        options: {
          partials: {
            dir: __dirname + '/modules/mail/templates/partials',
            options: {
              strict: true,
            },
          },
        },
      }),
    }),
    AdminModule,
    UserModule,
    AuthModule,
    TokenModule,
    MailModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_PIPE,
      useClass: CustomValidationPipe,
    },
  ],
})
export class AppModule {}
