import { Router } from "express";
import validateUrl, { validateShortUrlParams, validateUrlParams } from "../middlewares/url.middleware.js";
import { getUrl, openShortUrl, postUrl } from "../controllers/url.controller.js";

const router = Router()

router.post("/urls/shorten", validateUrl, postUrl)
router.get("/urls/:id", validateUrlParams, getUrl)
router.get("/urls/open/:shortUrl", validateShortUrlParams, openShortUrl)
router.get("/users/me")
router.delete("/ranking")

export default router