import { Accomodation } from "../entities"

export type CreateAccomodationPayload = Omit<
  Accomodation,
  "id" | "createdAt" | "updatedAt" | "verified"
>
export type GetAccomodationsPayload = Partial<{
  budgetFrom: number
  budgetTo: number
  compoundType: string
  houseType: string
  security: boolean
  tiled: boolean
  waterSupply: boolean
}>
