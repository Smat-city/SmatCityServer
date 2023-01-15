import { StatusCodes } from "http-status-codes"
import { inject, injectable, singleton } from "tsyringe"
import { EntityManager } from "typeorm"
import { User } from "../entities"
import { TransactionService } from "../interfaces"
import { CustomError } from "../utils"

@injectable()
@singleton()
export default class UserService extends TransactionService {
  protected entityManager: EntityManager

  protected transactionManager?: EntityManager | undefined

  constructor(@inject("entityManager") entityManager: EntityManager) {
    super()
    this.entityManager = entityManager
  }

  async users() {
    try {
      const result = await this.entityManager.find(User)
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

  async user(id: string) {
    try {
      const userExists =
        (await this.entityManager.count(User, {
          where: {
            id,
          },
        })) > 0

      if (userExists === false) {
        throw new CustomError("User not found", StatusCodes.NOT_FOUND)
      }

      const result = await this.entityManager.findOne(User, {
        select: {
          id: true,
          username: true,
          firstname: true,
          lastname: true,
          email: true,
          verified: true,
          type: true,
        },
        where: {
          id,
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
