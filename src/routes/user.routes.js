import { Router } from "express";
import { validateSignUp, validateSignIn } from "../middlewares/user.middleware.js";
import { postSignIn, postSignUp } from "../controllers/user.controller.js";

const router = Router()

router.post("/signup", validateSignUp, postSignUp)
router.post("/signin", validateSignIn, postSignIn)

export default router