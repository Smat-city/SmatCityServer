const childProcess = require("child_process")
const dotenv = require("dotenv")
const path = require("path")

dotenv.config()

const logsPath = path.join(
  path.resolve(__dirname),
  process.env.NODE_ENV === "development" ? "../src/logs" : "../dist/logs"
)

childProcess.exec(`rm -rf ${logsPath}`, (err, stdout, stderr) => {
  if (!err && !stderr) {
    console.info("Logs cleared! 🐱✨")
    return
  }

  console.error("😿 Logs could not be cleared because " + err.message || stderr)
})
