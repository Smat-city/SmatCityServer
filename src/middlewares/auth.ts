import { NextFunction, Request, RequestHandler, Response } from "express"
import { JwtPayload } from "jsonwebtoken"
import { container } from "tsyringe"
import { globals, passportConfig } from "../configs"
import { UsersService } from "../services"
import { CustomError } from "../utils"

const { passport, strategy } = passportConfig

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  ;(
    passport.authenticate(
      strategy,
      {
        session: false,
        failWithError: true,
      },
      async (err, user: JwtPayload | null) => {
        if (err) return next(err)

        if (!user) {
          return next(
            new CustomError("Unauthorized", globals.CODE_UNAUTHORIZED, 401)
          )
        }

        const userId = (user as { id: string }).id

        const usersService = container.resolve(UsersService)

        const { result, err: userError } = await usersService.user(userId)
        if (userError) return next(userError)

        if (!result) {
          return next(
            new CustomError("Unauthorized", globals.CODE_UNAUTHORIZED, 401)
          )
        }

        req.user = {
          ...user,
          ...result,
        }
        return next()
      }
    ) as RequestHandler
  )(req, res, next)
}
