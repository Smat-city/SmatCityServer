import { NextFunction, Request, Response } from "express"
import { container } from "tsyringe"
import { UsersService } from "../services"

export const user = async (req: Request, res: Response, next: NextFunction) => {
  const userService = container.resolve(UsersService)

  const { id } = req.params

  const { result, err: userError } = await userService.user(id)

  if (userError) {
    return next(userError)
  }

  return res.json({
    success: true,
    user: result,
  })
}

export const users = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userService = container.resolve(UsersService)

  const { result, err: userError } = await userService.users()
  if (userError) {
    return next(userError)
  }

  return res.json({
    success: true,
    user: result,
  })
}
