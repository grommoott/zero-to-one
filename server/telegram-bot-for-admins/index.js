const TelegramBot = require("node-telegram-bot-api")
const pgClient = require("../pgClient")
const path = require("path")
const fs = require("fs/promises")

async function createBot() {
    const token = "7200014819:AAHnGd9s9Woa8_a-dCXB9foLmR5bkB5Z50Q" // кто скопирует тот лох
    const admins = (await pgClient.query("select username from admins")).rows
    const bot = new TelegramBot(token, { polling: true })

    try {
        const courses = (
            await pgClient.query("select photoId from courses")
        ).rows

        for (course of courses) {
            const filePath = await bot.downloadFile(
                course.photoid,
                path.join(__dirname, `../course-images/`)
            )

            fs.rename(filePath, path.join(__dirname, `../course-images/${course.coursename}.jpg`))
        }
    } catch (e) {
        console.log(e)
    }

    bot.onText(/^\/start/, (msg) => {
        bot.sendMessage(
            msg.chat.id,
            'Этот бот нужен для общения между админами школы программирования ZeroToOne - IT School и сервером нашей школы. Список доступных команд: \n\n\t- /newcourse "Имя курса" "Описание курса" "Полное описание курса" цена "Ссылка на канал" id_канала \n\t- /deletecourse "Имя курса" \n\t- /updatecourse "Имя курса" "Новое имя курса" "Новое описание курса" "Новое полное описание курса" новая_цена "Новая сылка на канал" новый_id_канала'
        )
    })

    bot.on("message", async (msg) => {
        if (!admins.find((admin) => admin.username == msg.from.username)) {
            bot.sendMessage(
                msg.chat.id,
                "Вы не являетесь админом ZeroToOne - IT School и не имеете права командовать мной"
            )
            return
        }

        if (msg.caption?.startsWith("/newcourse")) {
            const match = msg.caption.match(
                /^\/newcourse\s+"(.+)"\s+"(.+)"\s+"(.+)"\s+([0-9]+)\s+"(.+)"\s+([-0-9]+)/
            )

            if (!match) {
                bot.sendMessage(
                    msg.chat.id,
                    'Для создания курса необходимо отправить изображение в формате jpg, которое будет изображением курса, и в его описании написать команду /newcourse "Имя курса" "Описание курса" "Полное описание курса" цена "Ссылка на канал" id_канала'
                )
                return
            }

            if (!msg.photo) {
                bot.sendMessage(
                    msg.chat.id,
                    "Для создания курса необходимо отправить изображение в формате jpg будущего курса и в описание к изображению добавить эту команду"
                )
                return
            }

            const fileId = msg.photo.pop().file_id

            const filePath = await bot.downloadFile(
                fileId,
                path.join(__dirname, `../course-images/`)
            )

            fs.rename(
                filePath,
                path.join(__dirname, `../course-images/${match[1]}.jpg`)
            )

            try {
                await pgClient.query(
                    `insert into courses values ('${match[1]}', '${match[2]}', '${match[3]}', ${match[4]}, '${match[5]}', ${match[6]}, ${fileId})`
                )
                bot.sendMessage(
                    msg.chat.id,
                    `Курс под названием ${match[1]} успешно создан`
                )
            } catch (e) {
                console.log(e)
            }
        } else if (msg.text?.startsWith("/deletecourse")) {
            const match = msg.text.match(/^\/deletecourse\s+"(.+)"/)

            if (!match) {
                bot.sendMessage(
                    msg.chat.id,
                    'Неверно переданы аргументы. Для удаления курса необходимо написать /deletecourse "Имя курса"'
                )
                return
            }

            try {
                pgClient.query(
                    `delete from courses where courseName='${match[1]}'`
                )
                bot.sendMessage(
                    msg.chat.id,
                    `Курс под названием ${match[1]} успешно удалён`
                )
            } catch (e) {
                console.log(e)
            }
        } else if (msg.caption?.startsWith("/updatecourse")) {
            const match = msg.caption.match(
                /^\/updatecourse\s+"(.+)"\s+"(.+)"\s+"(.+)"\s+"(.+)"\s+([0-9_]+)\s+"(.+)"\s+([-0-9_]+)/
            )

            if (!match) {
                bot.sendMessage(
                    msg.chat.id,
                    'Для изменения курса необходимо отправить изображение в формате jpg, которое будет изображением курса, и в его описании написать команду /updatecourse "Имя курса" "Новое имя курса" "Новое описание курса" "Новое полное описание курса" новая_цена "Новая сылка на канал" новый_id_канала. Если нет необходимости обновлять изображение, то нужно отправить обычное сообщение'
                )
                return
            }

            if (!msg.photo) {
                bot.sendMessage(
                    msg.chat.id,
                    "Для изменения курса необходимо отправить будущее изображение в формате jpg изменяемого курса и в описание к изображению добавить эту команду"
                )
                return
            }

            const fileId = msg.photo.pop().file_id

            const filePath = await bot.downloadFile(
                fileId,
                path.join(__dirname, `../course-images/`)
            )

            fs.rename(
                filePath,
                path.join(
                    __dirname,
                    `../course-images/${
                        match[2] == "_" ? match[1] : match[2]
                    }.jpg`
                )
            )

            try {
                const args = new Array()

                if (match[2] != "_") {
                    args.push(`courseName='${match[2]}'`)
                }

                if (match[3] != "_") {
                    args.push(`description='${match[3]}'`)
                }

                if (match[4] != "_") {
                    args.push(`fullDescription='${match[4]}'`)
                }

                if (match[5] != "_") {
                    args.push(`price=${match[5]}`)
                }

                if (match[6] != "_") {
                    args.push(`groupLink='${match[6]}'`)
                }

                if (match[7] != "_") {
                    args.push(`groupId=${match[7]}`)
                }

                args.push(`photoid=${fileId}`)

                await pgClient.query(
                    `update courses set ${args.join(", ")} where courseName='${
                        match[1]
                    }'`
                )
                bot.sendMessage(
                    msg.chat.id,
                    `Курс под названием ${match[1]} успешно обновлён`
                )
            } catch (e) {
                console.log(e)
            }
        } else if (msg.text?.startsWith("/updatecourse")) {
            const match = msg.text.match(
                /^\/updatecourse\s+"(.+)"\s+"(.+)"\s+"(.+)"\s+"(.+)"\s+([0-9_]+)\s+"(.+)"\s+([-0-9_]+)/
            )

            if (!match) {
                bot.sendMessage(
                    msg.chat.id,
                    'Неправильно переданы аргументы. Пример правильного варианта - /updatecourse "Имя курса" "Новое имя курса" "Новое описание курса" "Новое полное описание курса" новая_цена "Новая сылка на канал" новый_id_канала. _ - чтобы изменить предыдущее значение.'
                )
                return
            }

            fs.rename(
                path.join(__dirname, `../course-images/${match[1]}.jpg`),
                path.join(__dirname, `../course-images/${match[2]}.jpg`)
            )

            try {
                const args = new Array()

                if (match[2] != "_") {
                    args.push(`courseName='${match[2]}'`)
                }

                if (match[3] != "_") {
                    args.push(`description='${match[3]}'`)
                }

                if (match[4] != "_") {
                    args.push(`fullDescription='${match[4]}'`)
                }

                if (match[5] != "_") {
                    args.push(`price=${match[5]}`)
                }

                if (match[6] != "_") {
                    args.push(`groupLink='${match[6]}'`)
                }

                if (match[7] != "_") {
                    args.push(`groupId=${match[7]}`)
                }

                await pgClient.query(
                    `update courses set ${args.join(", ")} where courseName='${
                        match[1]
                    }'`
                )
                bot.sendMessage(
                    msg.chat.id,
                    `Курс под названием ${match[1]} успешно обновлён`
                )
            } catch (e) {
                console.log(e)
            }
        }
    })

    return bot
}

module.exports = createBot()
