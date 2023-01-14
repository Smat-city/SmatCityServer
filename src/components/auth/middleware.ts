import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { globals } from "../../configs"
import { CustomError } from "../../utils"

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const { type } = req.user as {
    type: string
  }

  if (type !== "admin") {
    return next(
      new CustomError(
        "This route does not exist",
        globals.CODE_NOT_FOUND,
        StatusCodes.NOT_FOUND
      )
    )
  }
  next()
}
