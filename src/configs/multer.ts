import * as multer from "multer"
import type { Request } from "express"

const acceptedMimetypes = ["image/png", "image/jpeg", "image/jpg"]

export const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback
) => {
  if (!acceptedMimetypes.includes(file.mimetype))
    return callback(new multer.MulterError("LIMIT_UNEXPECTED_FILE"))
  callback(null, true)
}

const fileMiddleware = multer.default({
  fileFilter,
})

export default fileMiddleware
