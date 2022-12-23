import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import userRouters from "./routes/user.routes.js"
import urlRouters from "./routes/url.routes.js"

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use(userRouters)
app.use(urlRouters)

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Server running in port ${port}`))