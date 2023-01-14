import Accomodation from "../../entities/Accomodation"

export type CreateAccomodationPayload = Omit<
  Accomodation,
  "id" | "createdAt" | "updatedAt" | "verified"
>
