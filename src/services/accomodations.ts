import lodash from "lodash"
import { inject, injectable, singleton } from "tsyringe"
import { Between, EntityManager } from "typeorm"
import { accomodationDTO } from "../dtos"
import Accomodation from "../entities/Accomodation"

@injectable()
@singleton()
export default class AccomodationService {
  entityManager: EntityManager

  constructor(@inject("entityManager") entityManager: EntityManager) {
    this.entityManager = entityManager
  }

  async create(payload: accomodationDTO.CreateAccomodationPayload) {
    try {
      await this.entityManager.insert(Accomodation, {
        ...payload,
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

  async getAll(
    filters: accomodationDTO.GetAccomodationsPayload | null,
    all: boolean
  ) {
    const from = filters?.budgetFrom
    const to = filters?.budgetTo

    try {
      const result = await this.entityManager.find(Accomodation, {
        relations: {
          address: all,
          media: true,
        },
        where:
          !filters && all
            ? undefined
            : {
                ...lodash.omit(filters, "budgetFrom", "budgetTo"),
                ...(from && to
                  ? {
                      initialFee: Between(from, to),
                    }
                  : {}),
                ...(all ? {} : { verified: true }),
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
