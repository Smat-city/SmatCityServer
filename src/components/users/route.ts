import { RequestHandler, Router } from "express"
import { authenticate } from "../../configs/passport"
import { authMiddleware } from "../auth"
import { user, users } from "./controller"

const { isAdmin } = authMiddleware

const router = Router()

router.use(authenticate)

router.use(isAdmin)

router.get("/", users as RequestHandler)

router.get("/:id", user as RequestHandler)

export default router
