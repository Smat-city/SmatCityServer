import "reflect-metadata"
import { StatusCodes } from "http-status-codes"
import { container } from "tsyringe"
import { globals } from "../configs"
import { authSchema } from "../schema"
import { AuthService } from "../services"
import { CustomError, hashManager, schemaValidator, token } from "../utils"
import type { authDTO } from "../dtos"
import type { NextFunction, Request, Response } from "express"

const { AuthRegisterSchema, AuthLoginSchema } = authSchema

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { validated, error: validationError } =
    schemaValidator<authDTO.CreateUserDTO>(AuthRegisterSchema, req.body)
  if (validationError || !validated) return next(validationError)
  const authService = container.resolve(AuthService)

  const { err: userCreationError } = await authService.createUser(validated)

  if (userCreationError) {
    return next(userCreationError)
  }

  res.json({
    success: true,
  })
}

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authService = container.resolve(AuthService)

  const { validated, error: validationError } =
    schemaValidator<authDTO.VerifyUserDTO>(AuthLoginSchema, req.body)
  if (validationError || !validated) return next(validationError)

  const { user, err: userVerificationError } = await authService.verifyUser(
    validated
  )

  if (userVerificationError) {
    return next(userVerificationError)
  }

  if (
    user === null ||
    hashManager.compare(validated.password, user.password) === false
  ) {
    return next(
      new CustomError(
        "Invalid username or password",
        globals.CODE_INVALID_CREDENTIALS,
        StatusCodes.UNAUTHORIZED
      )
    )
  }

  const { token: accessToken, err: accessTokenSignError } = token.signToken(
    {
      id: user.id,
      username: user.username,
      type: user.type,
      firstname: user.firstname,
      lastname: user.lastname,
      verified: user.verified,
      email: user.email,
    },
    {
      expiresIn: globals.ACCESS_TOKEN_TTL,
    }
  )

  if (accessTokenSignError) return next(accessTokenSignError)

  const expiresAt = new Date(Date.now() + globals.REFRESH_TOKEN_TTL)

  const { refreshToken, err: refreshTokenGenerationError } =
    await authService.generateRefreshToken(user.id, expiresAt)

  if (refreshTokenGenerationError) return next(refreshTokenGenerationError)

  res
    .cookie(globals.ACCESS_TOKEN_KEY as string, accessToken, {
      secure: globals.NODE_ENV === "production",
      httpOnly: true,
    })
    .cookie(globals.REFRESH_TOKEN_KEY as string, refreshToken, {
      secure: globals.NODE_ENV === "production",
      httpOnly: true,
    })
    .json({
      success: true,
    })
}

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authService = container.resolve(AuthService)

  const { id } = req.user as {
    id: string
  }

  const { cookies } = req as {
    cookies: { [key: string]: string }
  }

  const refreshToken = cookies[globals.REFRESH_TOKEN_KEY as string]

  const { result, err: getRefreshTokenError } =
    await authService.getRefreshToken(refreshToken, id)

  if (getRefreshTokenError) return next(getRefreshTokenError)

  if (result) {
    const { err: revokeRefreshTokenError } =
      await authService.revokeRefreshToken(result.token)

    if (revokeRefreshTokenError) return next(revokeRefreshTokenError)

    res.clearCookie(globals.REFRESH_TOKEN_KEY as string)
  }

  res
    .clearCookie(globals.ACCESS_TOKEN_KEY as string)

    .json({
      success: true,
    })
}

export const user = async (req: Request, res: Response) => {
  const { user: payload } = req

  res.json({
    success: true,
    payload,
  })
}

export const tokenRefresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authService = container.resolve(AuthService)
  const { cookies } = req as {
    cookies: {
      [key: string]: string
    }
  }

  const { id, username, type, firstname, lastname, verified, email } =
    req.user as {
      email: string
      firstname: string
      id: string
      lastname: string
      type: string
      username: string
      verified: boolean
    }
  const refreshToken = cookies[globals.REFRESH_TOKEN_KEY as string]
  const authToken = cookies[globals.ACCESS_TOKEN_KEY as string]

  const { payload, err: tokenVerificationError } = token.verifyToken(
    authToken,
    {
      ignoreExpiration: true,
    }
  )

  if (tokenVerificationError) return next(tokenVerificationError)

  if (Date.now() < (payload?.exp as number) * 1000) {
    return res.json({
      success: true,
    })
  }

  const { result, err: getRefreshTokenError } =
    await authService.getRefreshToken(refreshToken, id)

  if (getRefreshTokenError) return next(getRefreshTokenError)

  if (!result || new Date(Date.now()) > (result.expiresAt as Date)) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
    })
  }

  const { err: revokeRefreshTokenError } = await authService.revokeRefreshToken(
    result.token
  )

  if (revokeRefreshTokenError) return next(revokeRefreshTokenError)

  const { token: newAccessToken, err: accessTokenSignError } = token.signToken(
    {
      id,
      username,
      type,
      firstname,
      lastname,
      email,
      verified,
    },
    {
      expiresIn: globals.ACCESS_TOKEN_TTL,
    }
  )

  if (accessTokenSignError) return next(accessTokenSignError)

  const expiresAt = new Date(Date.now() + globals.REFRESH_TOKEN_TTL)

  const { refreshToken: newRefreshToken, err: refreshTokenGenerationError } =
    await authService.generateRefreshToken(id, expiresAt)

  if (refreshTokenGenerationError) return next(refreshTokenGenerationError)

  res
    .cookie(globals.ACCESS_TOKEN_KEY as string, newAccessToken, {
      secure: globals.NODE_ENV === "production",
      httpOnly: true,
    })
    .cookie(globals.REFRESH_TOKEN_KEY as string, newRefreshToken, {
      secure: globals.NODE_ENV === "production",
      httpOnly: true,
    })
    .json({
      success: true,
    })
}
