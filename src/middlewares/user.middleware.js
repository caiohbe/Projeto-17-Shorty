import joi from "joi"
import { getUserByEmail } from "../repositories/user.repository.js"
import bcrypt from "bcrypt"

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

    try {
        const user = await getUserByEmail(email)

        if (user.rows.length !== 0) {
            res.sendStatus(409)
            return
        }
        
    } catch (err) {
        res.status(500).send(err.message)
        return
    }

    

    next()
}


const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})

export async function validateSignIn(req, res, next) {
    const validation = signInSchema.validate(req.body)
    
    if (validation.error) {
        const errors = validation.error.details.map((d) => d.message)
        res.status(422).send(errors)
        return
    }
    
    const { email, password } = req.body

    try {
        const user = await getUser(email)

        if (!user.rows[0] || !bcrypt.compareSync(password, user.rows[0].password)) {
            res.sendStatus(401)
            return
        }
    } catch (err) {
        res.status(500).send(err.message)
    }
    
    next()
}