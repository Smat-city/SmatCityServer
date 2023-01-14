import path from "path"
import { transports, createLogger, format } from "winston"
import globals from "./globals"

const isProduction = globals.NODE_ENV === "production"

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
}

const filters = {
  error: format((info) => (info.level === "error" ? info : false)),
  warn: format((info) => (info.level === "warn" ? info : false)),
  info: format((info) => (info.level === "info" ? info : false)),
  http: format((info) => (info.level === "http" ? info : false)),
}

const logger = createLogger({
  exitOnError: false,
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize({
          colors: {
            error: "red",
            info: "green",
            warn: "yellow",
            http: "purple",
          },
        }),
        format.timestamp(),
        format.cli(),
        format.align(),
        format.printf(
          (template) =>
            `[${template.level}]: ${(template.message as string).trim()} on ${
              template.timestamp as string
            }`
        )
      ),
    }),
    new transports.File({
      format: format.combine(filters.warn(), format.timestamp(), format.json()),
      filename: path.resolve(
        isProduction ? "dist/logs/warn.log" : "src/logs/warn.log"
      ),
      level: "warn",
    }),
    new transports.File({
      format: format.combine(
        filters.error(),
        format.timestamp(),
        format.json()
      ),
      filename: path.resolve(
        isProduction ? "dist/logs/error.log" : "src/logs/error.log"
      ),
      level: "error",
    }),
    new transports.File({
      format: format.combine(filters.info(), format.timestamp(), format.json()),
      filename: path.resolve(
        isProduction ? "dist/logs/info.log" : "src/logs/info.log"
      ),
      level: "info",
    }),
    new transports.File({
      format: format.combine(filters.http(), format.timestamp(), format.json()),
      filename: path.resolve(
        isProduction ? "dist/logs/http.log" : "src/logs/http.log"
      ),
      level: "http",
    }),
  ],
  rejectionHandlers: new transports.File({
    format: format.combine(format.timestamp(), format.json()),
    filename: path.resolve(
      isProduction ? "dist/logs/rejections.log" : "src/logs/rejections.log"
    ),
  }),
  levels,
})

export default logger
