import { inject } from "tsyringe"
import { EntityManager } from "typeorm"
import Accomodation from "../../entities/Accomodation"

export default class AccomodationService {
  entityManager: EntityManager

  constructor(@inject("entityManager") entityManager: EntityManager) {
    this.entityManager = entityManager
  }

  async getAll() {
    try {
      const result = await this.entityManager.find(Accomodation, {
        where: {
          verified: true,
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
