import { User } from "../entities"

export type CreateUserDTO = Pick<
  User,
  "email" | "firstname" | "lastname" | "username" | "password"
>

export type VerifyUserDTO = Pick<User, "username" | "password">
