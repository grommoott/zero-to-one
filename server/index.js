const express = require("express")
//const bot = require("./telegram-bot")
const cors = require("cors")
const router = require("./router")
const PORT = process.env.PORT || 7778

const app = express()

app.use(cors())
app.use(express.static("../dist"))
app.use(express.json())
app.use("/api", router)

app.get("/", (req, res) => {
    res.sendFile("index.html")
})

app.listen(PORT, () => {
    console.log("Server started on port " + PORT)
})

//insert into courses (courseName, description, fullDescription, price) values ('Основы HTML', 'Создание простых сайтов', 'В этом курсе вы научитесь делать одностраничные сайты и простые формы', 90);
