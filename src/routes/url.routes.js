import { Router } from "express";
import validateUrl from "../middlewares/url.middleware.js";
import { postUrl } from "../controllers/url.controller.js";

const router = Router()

router.post("/urls/shorten", validateUrl, postUrl)
router.get("/urls/:id")
router.get("/urls/open/:shorturl")
router.get("/users/me")
router.delete("/ranking")

export default router