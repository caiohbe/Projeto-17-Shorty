import joi from "joi"
import { getToken } from "../repositories/url.repository.js"
import { getUrlByShortUrl, getUrlById } from "../repositories/url.repository.js"

const newUrlSchema = joi.object({
    url: joi.string().required()
})

export default async function validateUrl (req, res, next) {
    const validation = newUrlSchema.validate(req.body)
    
    if (validation.error) {
        const errors = validation.error.details.map((d) => d.message)
        res.status(422).send(errors)
        return
    }

    const token = req.headers.authorization?.replace("Bearer ", "")

    try {
        const validToken = await getToken(token)

        if (!validToken.rows[0]) {
            res.sendStatus(401)
            return
        }
        
    } catch (err) {
        res.status(500).send(err.message)
        return
    }

    next()
}

export async function validateUrlParams (req, res, next) {
    const id = req.params.id

    try {
        const url = await getUrlById(id)

        if (!url.rows[0]) {
            res.sendStatus(404)
            return
        }

    } catch (err) {
        res.status(500).send(err.message)
        return
    }

    next()
}

export async function validateShortUrlParams (req, res, next) {
    const shortUrl = req.params.shortUrl

    try {
        const url = await getUrlByShortUrl(shortUrl)

        if (!url.rows[0]) {
            res.sendStatus(404)
            return
        }

    } catch (err) {
        res.status(500).send(err.message)
        return
    }

    next()
}
