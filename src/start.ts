import "reflect-metadata"
import { container } from "tsyringe"
import { globals, logger, dbClient } from "./configs"
import { HTTPServer } from "./server"

dbClient
  .initialize()
  .then(async () => {
    container.register("entityManager", {
      useValue: dbClient.manager,
    })

    HTTPServer.listen(globals.PORT, () => {
      logger.info(`Server is running on port ${globals.PORT as string}... ✨`)
    })
  })
  .catch((err) => {
    logger.error("Could not initialize DB: ", err)
  })
