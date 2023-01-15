import { RequestHandler, Router } from "express"
import { authController } from "../controllers"
import { authMiddleware } from "../middlewares"

const { authenticate } = authMiddleware
const { register, login, logout, tokenRefresh, user } = authController

const router = Router()

router.post("/register", register as RequestHandler)

router.post("/login", login as RequestHandler)

router.post("/logout", authenticate, logout as RequestHandler)

router.get("/user", authenticate, user as RequestHandler)

router.post("/refresh", authenticate, tokenRefresh as RequestHandler)

export default router
