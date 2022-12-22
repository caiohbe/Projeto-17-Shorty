import { Router } from "express";
import { validateSignUp } from "../middlewares/user.middleware.js";
import { postSignUp } from "../controllers/user.controller.js";

const router = Router()

router.post("/signup", validateSignUp, postSignUp)

export default router