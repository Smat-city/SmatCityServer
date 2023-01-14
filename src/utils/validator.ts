import { Schema } from "zod"

export default <T>(schema: Schema, data: unknown) => {
  try {
    const validated = schema.parse(data) as T

    return {
      validated,
      error: null,
    }
  } catch (error) {
    return {
      validated: null,
      error,
    }
  }
}
