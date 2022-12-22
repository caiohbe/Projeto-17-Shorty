import { Router } from "express";
import { validateSignUp, validateSignIn } from "../middlewares/user.middleware.js";
import { postSignUp } from "../controllers/user.controller.js";

const router = Router()

router.post("/signup", validateSignUp, postSignUp)
router.post("/signin", validateSignIn, )

export default router