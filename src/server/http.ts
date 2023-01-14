import compression from "compression"
import cookieParser from "cookie-parser"
import cors from "cors"
import express, {
  ErrorRequestHandler,
  json,
  Request,
  Response,
  NextFunction,
  urlencoded,
} from "express"
import helmet from "helmet"
import { StatusCodes } from "http-status-codes"
import { TokenExpiredError } from "jsonwebtoken"
import morgan from "morgan"
import { ZodError } from "zod"
import { authComponent, usersComponent } from "../components"
import { globals, logger, passport } from "../configs"

interface CustomErrorRequestHandler extends ErrorRequestHandler {
  code: number
  message?: string
  status?: number
}

const server = express()

server.use(cors(globals.CORS_OPTIONS))
server.use(cookieParser())
server.use(helmet())
server.use(compression())
server.use(json())
server.use(
  urlencoded({
    extended: true,
  })
)
server.use(passport.initialize())
server.use(
  morgan("combined", {
    stream: {
      write: (message) => {
        logger.http(message.trim())
      },
    },
  })
)

server.use("/auth", authComponent.authRouter)

server.use("/users", usersComponent.usersRouter)

server.use("*", (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    code: globals.CODE_NOT_FOUND,
    message: "This route does not exist",
  })
})

server.use(
  (
    err: CustomErrorRequestHandler | ZodError | TokenExpiredError,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
  ) => {
    logger.error(err.message)

    if (err instanceof ZodError) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        code: globals.CODE_VALIDATION_ERROR,
        errors: err.flatten().fieldErrors,
      })
    }

    if (err instanceof TokenExpiredError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        code: globals.CODE_TOKEN_EXPIRED,
        error: err.message,
      })
    }

    res.status(err.status ?? StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      code:
        err.message === "Unauthorized"
          ? globals.CODE_UNAUTHORIZED
          : err.code ?? globals.CODE_SERVER_ERROR,
      error:
        globals.NODE_ENV === "production" &&
        err.status === StatusCodes.INTERNAL_SERVER_ERROR
          ? undefined
          : err.message ?? "An unknown error ocurred!",
    })
  }
)

export default server
