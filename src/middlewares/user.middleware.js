import joi from "joi"
import { getUser } from "../repository/user.repository.js"

const newUserSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required()
})

export async function validateSignUp (req, res, next) {
    const validation = newUserSchema.validate(req.body)
    
    if (validation.error) {
        const errors = validation.error.details.map((d) => d.message)
        res.status(422).send(errors)
        return
    }

    const { password, confirmPassword, email } = req.body

    if (password !== confirmPassword) {
        res.status(422).send("As senhas precisam ser idênticas.")
        return
    }

    const user = await getUser(email)

    if (user.rows.length !== 0) {
        res.sendStatus(409)
        return
    }

    next()
}