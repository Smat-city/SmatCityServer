import {
  JwtPayload,
  sign,
  SignOptions,
  verify,
  VerifyOptions,
} from "jsonwebtoken"
import { globals } from "../configs"

export const verifyToken = (token: string, options?: VerifyOptions) => {
  try {
    const payload = verify(
      token,
      globals.JWT_SECRET as string,
      options
    ) as JwtPayload
    return {
      payload,
      err: null,
    }
  } catch (err) {
    return {
      payload: null,
      err,
    }
  }
}

export const signToken = (payload: object | string, options?: SignOptions) => {
  try {
    const token = sign(payload, globals.JWT_SECRET as string, options)
    return {
      token,
      err: null,
    }
  } catch (err) {
    return {
      err,
    }
  }
}
