export default {
  REQUIRED: (fieldname: string) => `${fieldname} is required`,

  LIMIT: (fieldname: string, min?: number, max?: number) =>
    `${fieldname} ${
      min ? `should be a minimum of ${min.toString()} characters` : ""
    }${min && max ? " and " : ""}${
      max ? `should not exceed ${max.toString()} characters` : ""
    }`,

  NOTEMPTY: (fieldname: string) => `${fieldname} should not be empty`,

  EMAIL: "Invalid email address",

  EXISTS: (fieldname: string) => `${fieldname} already exists`,

  TYPE_ERROR: "Invalid type",
}
