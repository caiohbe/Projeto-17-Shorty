import connectionDB from "../database/db.js"

export function getUser(email) {
    return connectionDB.query('SELECT * FROM users WHERE email=$1;', [email])
}