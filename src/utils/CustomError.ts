class CustomError extends Error {
  message: string

  status: number | undefined

  code: number | undefined

  constructor(message: string, code?: number, status?: number) {
    super(message)
    this.message = message
    this.status = status
    this.code = code
  }
}

export default CustomError
