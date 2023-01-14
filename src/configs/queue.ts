import Bull from "bull"
import logger from "./logger"

const queue = new Bull("queue:schedule")

queue
  .process(() => {})
  .catch((err) => {
    logger.error(err)
  })

export default queue
