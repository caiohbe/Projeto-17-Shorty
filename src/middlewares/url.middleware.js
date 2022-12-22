import joi from "joi"
import { getToken, getUrlUserIdById, getUrlByShortUrl, getUrlById } from "../repositories/url.repository.js"
import { getUserIdByToken } from "../repositories/user.repository.js"

const newUrlSchema = joi.object({
    url: joi.string().required()
})

export default function validateUrl (req, res, next) {
    const validation = newUrlSchema.validate(req.body)
    
    if (validation.error) {
        const errors = validation.error.details.map((d) => d.message)
        res.status(422).send(errors)
        return
    }

    next()
}

export async function validateToken (req, res, next) {
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

export async function validateDelete (req, res, next) {
    const token = req.headers.authorization?.replace("Bearer ", "")
    const id = req.params.id

    try {
        const userId = await getUserIdByToken(token)
        const urlUserId = await getUrlUserIdById(id)

        if (userId.rows[0].userId !== urlUserId.rows[0].userId) {
            res.sendStatus(401)
            return
        } 

    } catch (err) {
        res.status(500).send(err.message)
    }
    
    next()
}