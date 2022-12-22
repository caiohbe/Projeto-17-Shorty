import connectionDB from "../database/db.js"

export function getToken(token) {
    return connectionDB.query("SELECT token from sessions WHERE token=$1;",[token])
}

export function insertUrl(userId, url, shortUrl) {
    return connectionDB.query('INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3);', [userId, url, shortUrl])
}

export function getUrlById(id) {
    return connectionDB.query('SELECT id, "shortUrl", url FROM urls WHERE id=$1;', [id])
}