import { plainToClass, Transform } from '@nestjs/class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsString,
  validateSync,
} from '@nestjs/class-validator';
import { Logger } from '@nestjs/common';

const logger = new Logger('EnvValidator');

enum Environment {
  Test = 'test',
  local = 'local',
  Staging = 'staging',
  Development = 'development',
  Production = 'production',
}

class EnvVariables {
  @IsNumber()
  @Transform(({ value }) => parseInt(value as string, 10))
  PORT!: number;

  @IsEnum(Environment)
  @Transform(({ value }) => value as Environment)
  NODE_ENV!: Environment;

  @IsString()
  DB_TYPE!: string;

  @IsString()
  DB_USERNAME!: string;

  @IsString()
  DB_PASSWORD!: string;

  @IsString()
  DB_HOST!: string;

  @IsString()
  DB_PORT!: string;

  @IsString()
  DB_ENTITIES!: string;

  @IsString()
  DB_MIGRATIONS!: string;

  @IsString()
  DB_NAME!: string;

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  DB_SSL!: boolean;

  @IsString()
  JWT_SECRET!: string;

  @IsString()
  JWT_EXPIRES_IN!: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value as string, 10))
  SMTP_PORT!: number;

  @IsString()
  SMTP_HOST!: string;

  @IsString()
  SMTP_USER!: string;

  @IsString()
  SMTP_FROM!: string;

  @IsString()
  SMTP_PASS!: string;

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  QUEUE_TLS!: boolean;

  @IsString()
  QUEUE_HOST!: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value as string, 10))
  QUEUE_PORT!: number;

  @IsString()
  QUEUE_USERNAME!: string;

  @IsString()
  QUEUE_PASSWORD!: string;
}

export function validateEnv(config: Record<string, unknown>): EnvVariables {
  const validatedConfig = plainToClass(EnvVariables, config);

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    errors.forEach((error) => {
      Object.values(error.constraints ?? {}).forEach((message) => {
        logger.error(`ENV Validation Error: ${message}`);
      });

      process.exit(1);
    });
  }

  return validatedConfig;
}
