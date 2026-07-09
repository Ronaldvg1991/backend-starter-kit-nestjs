import { plainToInstance, Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  @Type(() => String)
  NODE_ENV!: Environment;

  @IsNumber()
  @Type(() => Number)
  APP_PORT!: number;

  @IsString()
  @Type(() => String)
  DB_HOST!: string;

  @IsNumber()
  @Type(() => Number)
  DB_PORT!: number;

  @IsString()
  @Type(() => String)
  DB_USERNAME!: string;

  @IsString()
  @Type(() => String)
  DB_PASSWORD!: string;

  @IsString()
  @Type(() => String)
  DB_NAME!: string;

  @IsString()
  @Type(() => String)
  JWT_SECRET!: string;

  @IsString()
  @Type(() => String)
  JWT_EXPIRATION!: string;

  @IsString()
  @Type(() => String)
  JWT_REFRESH_EXPIRATION!: string;
}

export function validate(
  config: Record<string, unknown>,
): EnvironmentVariables {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
