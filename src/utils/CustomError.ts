import { globals } from "../configs"

class CustomError extends Error {
  message: string

  status: number | undefined

  code: number

  constructor(message: string, code?: number, status?: number) {
    super(message)
    this.message = message
    this.status = status
    this.code = code ?? globals.CODE_SERVER_ERROR
  }
}

export default CustomError
