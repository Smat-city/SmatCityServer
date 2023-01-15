import { NextFunction, Request, Response } from "express"
import { container } from "tsyringe"
import { accomodationsSchema } from "../schema"
import { AccomodationsService } from "../services"
import { schemaValidator } from "../utils"
import type { accomodationDTO } from "../dtos"

const { getAccomodationsSchema, createAccomodationsSchema } =
  accomodationsSchema

export const getAllAccomodations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accomodationService = container.resolve(AccomodationsService)

  const { validated: filters, error: validationError } =
    schemaValidator<accomodationDTO.GetAccomodationsPayload>(
      getAccomodationsSchema,
      req.query
    )

  if (validationError) return next(validationError)
  const { result: accomodations, err: getAllAccomodationsError } =
    await accomodationService.getAll(filters, false)

  if (getAllAccomodationsError) return next(getAllAccomodationsError)

  res.json({
    success: true,
    accomodations,
  })
}

export const addAccomodation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { validated, error: validationError } =
    schemaValidator<accomodationDTO.CreateAccomodationPayload>(
      createAccomodationsSchema,
      req.body
    )

  if (validationError) return next(validationError)

  res.json({
    success: true,
    validated,
  })
  // accomodationService.create(filters)
}
