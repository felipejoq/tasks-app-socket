import 'dotenv/config';
import { get } from 'env-var';

export const envsPlugin = {
  PORT: get('PORT').required().asPortNumber(),
  PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
  HOST_DB: get('PGHOST').required().asString(),
  PORT_DB: get('PGPORT').required().asPortNumber(),
  USERNAME_DB: get('PGUSER').required().asString(),
  PASSWORD_DB: get('PGPASSWORD').default('').asString(),
  DATABASE_DB: get('PGDATABASE').required().asString(),
  SYNCHRONIZE_DB: get('SYNCHRONIZE_DB').required().asBool(),
  LOGGING_DB: get('LOGGING_DB').required().asBool(),
  TIMEZONE: get('TIMEZONE_DB').default('America/Santiago').asString(),
}