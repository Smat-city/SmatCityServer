export interface CreateUserDTO {
  email: string
  firstname: string
  lastname: string
  password: string
  username: string
}

export interface VerifyUserDTO {
  password: string
  username: string
}
