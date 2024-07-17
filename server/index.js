const express = require("express")
const bot = process.env.ISONRENDER ? null : require("./telegram-bot")
const cors = require("cors")
const router = require("./router")
const PORT = process.env.PORT || 7777

const app = express()

app.use(cors())
app.use(express.json())
app.use("/", router)

app.listen(PORT, () => {
    console.log("Server started on port " + PORT)
})
