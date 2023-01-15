import { boolean, number, object, string } from "zod"
import { messages } from "../utils"

export const getAccomodationsSchema = object({
  houseType: string({
    invalid_type_error: messages.TYPE_ERROR,
  }).optional(),
  compoundType: string({
    invalid_type_error: messages.TYPE_ERROR,
  }).optional(),
  tiled: boolean({
    invalid_type_error: messages.TYPE_ERROR,
  }).optional(),
  waterSupply: boolean({
    invalid_type_error: messages.TYPE_ERROR,
  }).optional(),
  security: boolean({
    invalid_type_error: messages.TYPE_ERROR,
  }).optional(),
  budgetFrom: number({
    invalid_type_error: messages.TYPE_ERROR,
  }).optional(),
  budgetTo: number({
    invalid_type_error: messages.TYPE_ERROR,
  }).optional(),
})

export const createAccomodationsSchema = object({
  houseType: string({
    invalid_type_error: messages.TYPE_ERROR,
    required_error: messages.REQUIRED("houseType"),
  }),
  compoundType: string({
    invalid_type_error: messages.TYPE_ERROR,
    required_error: messages.REQUIRED("compundType"),
  }),
  tiled: boolean({
    invalid_type_error: messages.TYPE_ERROR,
    required_error: messages.REQUIRED("tiled"),
  }),
  waterSupply: boolean({
    invalid_type_error: messages.TYPE_ERROR,
    required_error: messages.REQUIRED("waterSupply"),
  }),
  security: boolean({
    invalid_type_error: messages.TYPE_ERROR,
    required_error: messages.REQUIRED("security"),
  }),
  initialFee: number({
    invalid_type_error: messages.TYPE_ERROR,
    required_error: messages.REQUIRED("initialFee"),
  }),
  subsequentFee: number({
    invalid_type_error: messages.TYPE_ERROR,
    required_error: messages.REQUIRED("subsequentFee"),
  }),
  address: object(
    {
      address: string(),
      city: string(),
      state: string(),
      country: string(),
    },
    {
      required_error: messages.REQUIRED("address"),
    }
  ),
})
