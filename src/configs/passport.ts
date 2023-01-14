import { Request, RequestHandler } from "express"
import { JwtPayload, TokenExpiredError, VerifyCallback } from "jsonwebtoken"
import { Passport } from "passport"
import { Strategy } from "passport-jwt"
import globals from "./globals"

const verify = (req: Request, payload: JwtPayload, done: VerifyCallback) => {
  if (req.url === "/refresh") {
    return done(null, payload)
  }
  if (Date.now() > (payload.exp as number) * 1000) {
    return done(
      new TokenExpiredError(
        "Token is no longer valid",
        new Date(payload.exp as number)
      ),
      undefined
    )
  }
  done(null, payload)
}

export const passport = new Passport()

export const strategy = new Strategy(
  {
    ignoreExpiration: true,
    secretOrKey: globals.JWT_SECRET,

    passReqToCallback: true,

    jwtFromRequest: (req) =>
      (req.cookies as { [key: string]: string })[
        globals.ACCESS_TOKEN_KEY as string
      ],
  },

  verify
)

export const authenticate = passport.authenticate(strategy, {
  session: false,
  failWithError: true,
}) as RequestHandler
