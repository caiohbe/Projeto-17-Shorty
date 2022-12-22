import joi from "joi"
import { getToken } from "../repositories/url.repository.js"

const newUrlSchema = joi.object({
    url: joi.string().required()
})

export default async function validateUrl(req, res, next) {
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