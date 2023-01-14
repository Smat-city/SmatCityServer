import { object, string } from "zod"
import { messages } from "../../utils"

const transform = (arg: string, trimOnly?: boolean) => {
  const trimmedString = arg.trim()

  return trimOnly
    ? trimmedString
    : `${trimmedString[0].toUpperCase()}${trimmedString.slice(1)}`
}

export const AuthRegisterSchema = object({
  firstname: string({
    required_error: messages.REQUIRED("Firstname"),
  })
    .min(1, {
      message: messages.NOTEMPTY("Firstname"),
    })
    .transform((arg) => transform(arg)),
  lastname: string({
    required_error: messages.REQUIRED("Lastname"),
  })
    .min(1, {
      message: messages.NOTEMPTY("Lastname"),
    })
    .transform((arg) => transform(arg)),
  username: string({
    required_error: messages.REQUIRED("Username"),
  })
    .min(1, {
      message: messages.NOTEMPTY("Username"),
    })
    .max(25, {
      message: messages.LIMIT("Username", undefined, 25),
    })
    .transform((arg) => transform(arg, true)),
  email: string({
    required_error: messages.REQUIRED("Email"),
  })
    .min(1, {
      message: messages.NOTEMPTY("Email"),
    })
    .email({
      message: messages.EMAIL,
    }),
  password: string({
    required_error: messages.REQUIRED("Password"),
  }).min(8, {
    message: messages.LIMIT("Password", 8),
  }),
})

export const AuthLoginSchema = object({
  username: string({
    required_error: messages.REQUIRED("Username"),
  }).min(1, {
    message: messages.NOTEMPTY("Username"),
  }),
  password: string({
    required_error: messages.REQUIRED("Password"),
  }).min(1, {
    message: messages.NOTEMPTY("Password"),
  }),
})
