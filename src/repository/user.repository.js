import connectionDB from "../database/db.js"

export function getUser(email) {
    return connectionDB.query("SELECT * FROM users WHERE email=$1;", [email])
}

export function insertUser(name, email, password) {
    return connectionDB.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3);",
    [name, email, password])
}