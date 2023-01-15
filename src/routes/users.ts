import { RequestHandler, Router } from "express"
import { usersController } from "../controllers"
import { authMiddleware } from "../middlewares"

const { authenticate } = authMiddleware

const { users, user } = usersController

const router = Router()

router.use(authenticate)

router.get("/", users as RequestHandler)

router.get("/:id", user as RequestHandler)

export default router
