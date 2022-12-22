import { nanoid } from "nanoid";
import { getUserIdByToken } from "../repositories/user.repository.js";
import { insertUrl, getUrlById } from "../repositories/url.repository.js";

export async function postUrl (req, res) {
    const shortUrl = nanoid()
    const url = req.body.url
    const token = req.headers.authorization?.replace("Bearer ", "")
    
    try {
        const user = await getUserIdByToken(token)
        const userId = user.rows[0].userId

        await insertUrl(userId, url, shortUrl)
        res.status(201).send({ shortUrl })
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getUrl (req, res) {
    const id = req.params.id
    const resObj = await getUrlById(id)

    if (!resObj.rows[0]) {
        res.sendStatus(404)
        return
    }
    
    res.send(resObj.rows[0])
}