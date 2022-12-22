import { nanoid } from "nanoid";
import { getUserIdByToken } from "../repositories/user.repository.js";
import { insertUrl, getUrlById, deleteUrlById } from "../repositories/url.repository.js";

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

    try {
        const url = await getUrlById(id)
        res.status(200).send(url.rows[0])
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function openShortUrl (req, res) {
    res.send("TEST")
}

export async function deleteUrl (req, res) {
    const id = req.params.id

    try {
        await deleteUrlById(id)
        res.sendStatus(204)
        return

    } catch (err) {
        res.status(500).send(err.message)
    }
}