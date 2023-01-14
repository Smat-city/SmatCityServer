import { EntityManager } from "typeorm"
import { IsolationLevel } from "typeorm/driver/types/IsolationLevel"

export default abstract class TransactionService {
  protected abstract entityManager: EntityManager

  protected abstract transactionManager?: EntityManager

  setTransaction(transactionManager: EntityManager) {
    if (transactionManager) {
      this.entityManager = transactionManager
      this.transactionManager = transactionManager
    }

    return this
  }

  async runTranscation<T>(
    transactionHandler: (manager: EntityManager) => Promise<T | unknown>,
    isolationLevel?: IsolationLevel
  ) {
    if (this.transactionManager) {
      try {
        const result = await transactionHandler(this.transactionManager)
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
    const temporaryManager = this.entityManager
    try {
      const result = await this.entityManager.transaction(
        isolationLevel ?? "SERIALIZABLE",
        (manager) => {
          this.entityManager = manager
          this.transactionManager = manager
          return transactionHandler(manager)
        }
      )
      this.entityManager = temporaryManager
      this.transactionManager = undefined
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
