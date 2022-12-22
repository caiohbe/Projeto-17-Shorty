import { Router } from "express";
import validateUrl, { validateDelete, validateShortUrlParams, validateToken, validateUrlParams } from "../middlewares/url.middleware.js";
import { deleteUrl, getUrl, openShortUrl, postUrl } from "../controllers/url.controller.js";

const router = Router()

router.post("/urls/shorten", validateUrl, validateToken, postUrl)
router.get("/urls/:id", validateUrlParams, getUrl)
router.get("/urls/open/:shortUrl", validateShortUrlParams, openShortUrl)
router.get("/users/me")
router.delete("/urls/:id", validateToken, validateDelete, deleteUrl)
router.get("/ranking")

export default router