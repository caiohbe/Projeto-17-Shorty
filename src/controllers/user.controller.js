import bcrypt from "bcrypt"
import { insertUser, getUserIdByEmail, insertToken, getUserIdByToken, getUserStatsById, getRankingQuery } from "../repositories/user.repository.js"
import { v4 as uuid } from 'uuid';
import { getUrlsByUserId } from "../repositories/url.repository.js";

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
        const userId = await getUserIdByEmail(email)
        await insertToken(userId.rows[0].id, token)
        res.status(200).send(token)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getMyUser (req, res) {
    const token = req.headers.authorization?.replace("Bearer ", "")

    try {
        const user = await getUserIdByToken(token)
        const userId = user.rows[0].userId

        const myUrls = await getUrlsByUserId(userId)

        const userStats = await getUserStatsById(userId)
        const { id, name } = userStats.rows[0]
        const shortenedUrls = myUrls.rows

        let visitCount = 0

        shortenedUrls.forEach((url) => {
            visitCount += url.visitCount
        })

        const resObj = {
            id,
            name,
            visitCount,
            shortenedUrls
        }

        res.send(resObj)
        
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getRanking (req, res) {
    try {
        const ranking = await getRankingQuery()
        res.send(ranking.rows).status(200);
    } catch (err) {
        res.status(500).send(err.message)
    }
}