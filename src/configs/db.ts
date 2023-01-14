import path from "path"
import "reflect-metadata"
import { DataSource } from "typeorm"
import globals from "./globals"

const dbClient = new DataSource({
  type: "mysql",
  host: globals.DB_HOST,
  port: (globals.DB_PORT as unknown as number) ?? 3306,
  username: globals.DB_USER,
  password: globals.DB_PASSWORD,
  database: globals.DB_NAME,
  synchronize: globals.NODE_ENV === "development",
  logging:
    globals.NODE_ENV === "development" ? "all" : ["error", "info", "log"],
  entities: [path.join(__dirname, "../entities/**/*.{js,ts}")],
  subscribers: [],
})

export default dbClient
