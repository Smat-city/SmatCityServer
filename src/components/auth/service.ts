import { randomUUID } from "crypto"
import { StatusCodes } from "http-status-codes"
import { inject, injectable } from "tsyringe"
import { EntityManager } from "typeorm"
import { globals } from "../../configs"
import { User, Token } from "../../entities"
import { TokenType } from "../../entities/Token"
import { TransactionService } from "../../interfaces"
import { CustomError, hashManager, messages } from "../../utils"
import { CreateUserDTO, VerifyUserDTO } from "./dto"

@injectable()
export default class AuthService extends TransactionService {
  protected entityManager: EntityManager

  protected transactionManager?: EntityManager | undefined

  constructor(@inject("entityManager") entityManager: EntityManager) {
    super()
    this.entityManager = entityManager
  }

  async createUser(payload: CreateUserDTO) {
    const { username, password, firstname, lastname, email } = payload

    try {
      const usernameExists =
        (await this.entityManager.count(User, {
          where: {
            username,
          },
        })) !== 0

      const emailExists =
        (await this.entityManager.count(User, {
          where: {
            email,
          },
        })) !== 0

      if (usernameExists) {
        throw new CustomError(
          messages.EXISTS("username"),
          globals.CODE_FIELD_EXISTS,
          StatusCodes.CONFLICT
        )
      }

      if (emailExists) {
        throw new CustomError(
          messages.EXISTS("email"),
          globals.CODE_FIELD_EXISTS,
          StatusCodes.CONFLICT
        )
      }

      const hashedPassword = hashManager.hash(password)

      await this.entityManager.insert(User, {
        username,
        password: hashedPassword,
        firstname,
        lastname,
        email,
      })
      return {
        err: null,
      }
    } catch (err) {
      return {
        err,
      }
    }
  }

  async verifyUser(payload: VerifyUserDTO) {
    const { username } = payload
    try {
      const user = (await this.entityManager.findOne(User, {
        select: {
          id: true,
          username: true,
          password: true,
          type: true,
        },
        where: {
          username,
        },
      })) as Pick<User, "id" | "username" | "password" | "type">

      return {
        user,
        err: null,
      }
    } catch (err) {
      return {
        user: null,
        err,
      }
    }
  }

  async generateRefreshToken(userId: string, expiresAt: Date) {
    try {
      const refreshToken = randomUUID()
      const user = await this.entityManager.findOne(User, {
        where: {
          id: userId,
        },
      })

      await this.entityManager.save(Token, {
        type: TokenType.refresh,
        token: refreshToken,
        expiresAt,
        user: user as User,
      })

      return {
        refreshToken,
        err: null,
      }
    } catch (err) {
      return {
        err,
      }
    }
  }

  async revokeRefreshToken(token: string) {
    try {
      await this.entityManager.delete(Token, {
        token,
        type: TokenType.refresh,
      })

      return {
        err: null,
      }
    } catch (err) {
      return {
        err,
      }
    }
  }

  async getRefreshToken(token: string, userId: string) {
    try {
      const result = await this.entityManager.findOne(Token, {
        select: {
          id: true,
          token: true,
          expiresAt: true,
        },
        where: {
          token,
          type: TokenType.refresh,
          user: {
            id: userId,
          },
        },
      })

      return {
        result,
        err: null,
      }
    } catch (err) {
      return {
        result: null,
        err,
      }
    }
  }
}
