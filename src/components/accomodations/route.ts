import { Router } from "express"
import { authenticate } from "../../configs/passport"

const router = Router()

router.post("/", authenticate)

router.get("/", authenticate)

export default router
