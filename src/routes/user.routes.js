import { Router } from "express";
import { validateSignUp, validateSignIn } from "../middlewares/user.middleware.js";
import { getMyUser, postSignIn, postSignUp } from "../controllers/user.controller.js";
import { validateToken } from "../middlewares/url.middleware.js";

const router = Router()

router.post("/signup", validateSignUp, postSignUp)
router.post("/signin", validateSignIn, postSignIn)
router.get("/users/me", validateToken, getMyUser)
router.get("/ranking")

export default router