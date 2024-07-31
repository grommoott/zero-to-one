const config = require("../config")
const pgClient = require("../pgClient")
const bcrypt = require("bcrypt")
const TelegramBot = require("node-telegram-bot-api")
const yookassa = require("../helpers/yookassa")

function createBot() {
    const token = "6406717712:AAHZBB9Hj7v7ecVNCFO_PRaKBvOqKm8CWGo" // кто скопирует тот лох

    const bot = new TelegramBot(token, { polling: true })

    bot.on("chat_join_request", async ({ chat, from }) => {
        const courseName = await pgClient.query(`select coursename from courses where groupid=${chat.id}`)
        console.log("chat join request")

        if (!courseName) {
            console.log("Invalid course name", courseName)
            return
        }

        const activated =
            (await pgClient.query(
                `select * from activated where username='${from.username}' and courseName='${courseName}'`
            ).rowCount) == 1

        if (activated) {
            console.log("accept")
            bot.approveChatJoinRequest(chat.id, from.id)
        } else {
            console.log("cancel")
            bot.declineChatJoinRequest(chat.id, from.id)
        }
    })

    bot.onText(/\/start/, (msg) => {
        bot.sendMessage(
            msg.chat.id,
            'Используйте комманду list чтобы получить список курсов, доступных для активации, и с помощью команды activate (/activate "название курса" "кодовое слово") активируйте выбранный курс'
        )
    })

    bot.onText(/\/list/, async (msg) => {
        const response = await pgClient.query(
            `select * from orders where username='${msg.from.username}'`
        )

        if (response.rows.length == 0) {
            bot.sendMessage(
                msg.chat.id,
                "На данный момент у вас нет курсов которые можно активировать. Вы можете приобрести их на сайте " +
                config.website
            )
        } else {
            bot.sendMessage(
                msg.chat.id,
                `Сейчас вы можете активировать один из следующих курсов: \n\n${response.rows
                    .map((order, index) => `  ${index + 1}. ${order.coursename}`)
                    .join(
                        "\n"
                    )} \n\nПропишите команду /activate [имя_курса] [кодовое слово] для активации выбранного курса. Если в течении часа после покупки курс не будет активирован, то средства будут возвращены и курс пропадет из списка ждущих активацию.`
            )
        }
    })

    bot.onText(/\/activate$/, (msg) => {
        bot.sendMessage(
            msg.chat.id,
            'Команда /activate используется вместе с параметрами (имя курса) и (кодовое слово). Например: /activate "Основы HTML" "холодильник" '
        )
    })

    bot.onText(/\/activate "(.+)" "(.+)"/, async (msg, match) => {
        try {
            const response = await pgClient.query(
                `select * from orders where username='${msg.from.username}'`
            )

            const selectedOrder = response.rows.find(
                (order) => match[1] === order.coursename
            )

            if (!selectedOrder) {
                bot.sendMessage(
                    msg.chat.id,
                    "Неправильно указано имя курса или курс не приобретён, попробуйте ввести то же имя, что было написано в выводе команды /list. \nНапример: /activate [Основы HTML] [холодильник]"
                )
                return
            }

            if (!(await bcrypt.compare(match[2], selectedOrder.keywordhash))) {
                bot.sendMessage(
                    msg.chat.id,
                    'Неправильно введено кодовое слово. Будьте внимательны, кодовое слово чувствительно к регистру ("холодильник" не то же самое, что "ХолоДИЛЬниК").'
                )
                return
            }

            const activatedCourse = await (
                await pgClient.query(
                    `select * from courses where courseName='${selectedOrder.coursename}'`
                )
            ).rows.at(0)

            if (!activatedCourse) {
                throw new Error()
            }

            Promise.all([
                pgClient.query(
                    `delete from orders where username='${msg.from.username}' and courseName='${activatedCourse.coursename}'`
                ),
                pgClient.query(
                    `insert into activated values ('${msg.from.username}', '${activatedCourse.coursename}')`
                ),
                yookassa.acceptPayment(activatedCourse.paymentId)
            ])
                .then(() => {
                    bot.sendMessage(
                        msg.chat.id,
                        `Курс успешно активирован! \n Для вступления в группу в которой будут проходить занятия перейдите по этой ссылке - ${activatedCourse.grouplink}`
                    )
                })
                .catch((error) => console.log(error))
        } catch (e) {
            console.log("Error in Telegram Bot command activate:" + e)
        }
    })

    return bot
}

module.exports = createBot()
