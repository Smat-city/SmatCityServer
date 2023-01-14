import * as dotenv from "dotenv"

dotenv.config()

type CorsOptions = Partial<{
  credentials: boolean
  origin: string
}>

export default {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  FRONTEND_URL: process.env.FRONTEND_URL,
  CORS_OPTIONS: {
    credentials: true,
    origin: process.env.FRONTEND_URL,
  } as CorsOptions,
  DB_HOST: process.env.APP_DB_HOST,
  DB_USER: process.env.APP_DB_USER,
  DB_PASSWORD: process.env.APP_DB_PASSWORD,
  DB_CLIENT: process.env.APP_DB_CLIENT,
  DB_PORT: process.env.APP_DB_PORT,
  DB_NAME: process.env.APP_DB_NAME,
  ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY,
  ACCESS_TOKEN_TTL: process.env.ACCESS_TOKEN_TTL as string,
  REFRESH_TOKEN_TTL: Number(process.env.REFRESH_TOKEN_TTL),
  CODE_UNAUTHORIZED: Number(process.env.CODE_UNAUTHORIZED),
  CODE_INVALID_CREDENTIALS: Number(process.env.CODE_INVALID_CREDENTIALS),
  CODE_VALIDATION_ERROR: Number(process.env.CODE_VALIDATION_ERROR),
  CODE_SERVER_ERROR: Number(process.env.CODE_SERVER_ERROR),
  CODE_EMAIL_NOT_VERIFIED: Number(process.env.CODE_EMAIL_NOT_VERIFIED),
  CODE_FIELD_EXISTS: Number(process.env.CODE_FIELD_EXISTS),
  CODE_TOKEN_EXPIRED: Number(process.env.CODE_TOKEN_EXPIRED),
  CODE_NOT_FOUND: Number(process.env.CODE_NOT_FOUND),
}
