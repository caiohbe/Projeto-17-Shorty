import bcrypt from "bcrypt"
import { insertUser, getUserId, insertToken } from "../repository/user.repository.js"
import { v4 as uuid } from 'uuid';

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

export async function postSignIn (req, res) {
    const email = req.body.email
    const token = uuid()

    try {
        const userId = await getUserId(email)
        await insertToken(userId.rows[0].id, token)
        res.status(200).send(token)
    } catch (err) {
        res.status(500).send(err.message)
    }
}