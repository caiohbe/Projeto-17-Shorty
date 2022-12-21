import { Router } from "express";
import { validateSignUp } from "../middlewares/user.middleware.js";

const router = Router()

router.post("/signup", validateSignUp)

export default router