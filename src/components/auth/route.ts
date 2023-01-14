import { RequestHandler, Router } from "express"
import { authenticate } from "../../configs/passport"
import { login, logout, register, tokenRefresh, user } from "./controller"

const router = Router()

router.post("/register", register as RequestHandler)

router.post("/login", login as RequestHandler)

router.post("/logout", authenticate, logout as RequestHandler)

router.get("/user", authenticate, user as RequestHandler)

router.post("/refresh", authenticate, tokenRefresh as RequestHandler)

export default router
