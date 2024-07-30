const express = require("express")
require("./telegram-bot-for-admins")
require("./telegram-bot")
require("./overdueOrderDestroyer")

const cors = require("cors")
const router = require("./router")
const PORT = 8443//process.env.PORT || 10000

const app = express()

app.use(cors())
app.use(express.json())
app.use("/", router)

app.listen(PORT, () => {
    console.log("Server started on port " + PORT)
})
