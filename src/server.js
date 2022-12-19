import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

const port = 4000
app.listen(port, () => console.log(`Server running in port ${port}`))