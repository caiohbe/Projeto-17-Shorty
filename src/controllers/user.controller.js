import bcrypt from "bcrypt"
import { insertUser } from "../repository/user.repository.js"

export async function postSignUp (req, res) {
    const { name, email } = req.body
    const password = bcrypt.hashSync(req.body.password, 10)

    try {
        await insertUser(name, email, password)
        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}