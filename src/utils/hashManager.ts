import { compareSync, hashSync } from "bcrypt"

export const hash = (payload: string, salt?: number) => {
  return hashSync(payload, salt ?? 10)
}

export const compare = (payload: string, hashedPayload: string) => {
  return compareSync(payload, hashedPayload)
}
