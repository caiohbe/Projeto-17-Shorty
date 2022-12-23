import connectionDB from "../database/db.js"

export function getUserByEmail(email) {
    return connectionDB.query("SELECT * FROM users WHERE email=$1;", [email])
}

export function getUserIdByEmail(email) {
    return connectionDB.query("SELECT id FROM users WHERE email=$1;", [email])
}

export function getUserIdByToken(token) {
    return connectionDB.query('SELECT "userId" FROM sessions WHERE token=$1;', [token])
}

export function insertUser(name, email, password) {
    return connectionDB.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3);", [name, email, password])
}

export function insertToken(userId, token) {
    return connectionDB.query('INSERT INTO sessions ("userId", token) VALUES ($1, $2);', [userId, token])
}

export function getUserStatsById(id) {
    return connectionDB.query('SELECT id, name FROM users WHERE id=$1;', [id])
}

export function getRankingQuery() {
    return connectionDB.query(`
        SELECT us.id, us.name, 
        CASE WHEN COUNT(ur.*) = 0 THEN 0
        ELSE COUNT(ur.*) 
        END AS "linksCount", 
        CASE WHEN COUNT(ur.*) = 0 THEN 0 
        ELSE SUM(ur."visitCount") 
        END AS "visitCount" 
        FROM users AS us 
        LEFT JOIN urls AS ur 
        ON ur."userId" = us.id 
        GROUP BY us.id 
        ORDER BY "visitCount" DESC, "linksCount" DESC
        LIMIT 10;`
    )
}