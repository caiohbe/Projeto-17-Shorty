import express from "express"
import cors from "cors"
import userRouters from "./routes/user.routes.js"
import urlRouters from "./routes/url.routes.js"

const app = express()
app.use(cors())
app.use(express.json())
app.use(userRouters)
app.use(urlRouters)

/*
app.get('/teste', async(req, res) => {
    try {
        const teste = await connectionDB.query('select * from users;')

        res.send(teste.rows)
    } catch (err) {
        console.log(err)
    }
})
*/

const port = 4000
app.listen(port, () => console.log(`Server running in port ${port}`))