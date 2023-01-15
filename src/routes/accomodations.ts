import { RequestHandler, Router } from "express"
import { fileMiddleware } from "../configs"
import { accomodationsController } from "../controllers"
import { authMiddleware } from "../middlewares"

const { getAllAccomodations, addAccomodation } = accomodationsController

const router = Router()

const { authenticate } = authMiddleware

router.post("/", fileMiddleware.array("media"), authenticate, addAccomodation)

router.get("/", getAllAccomodations as RequestHandler)

export default router
