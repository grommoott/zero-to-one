const path = require("path")
const pgClient = require("./pgClient")
const bcrypt = require("bcrypt")
const { salt } = require("./config")
const yookassa = require("./helpers/yookassa")
const createOrder = require("./helpers/createOrder")
const payOrder = require("./helpers/payOrder")

module.exports = {
    getCourses: async (_, res) => {
        try {
            const result = await pgClient.query("select * from courses;")
            res.send(
                result.rows.map((val, index) => {
                    return {
                        name: val.coursename,
                        description: val.description,
                        fullDescription: val.fulldescription,
                        price: val.price,
                        id: index,
                    }
                })
            ).status(200)
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    },

    getCourseImage: async (req, res) => {
        res.sendFile(
            path.join(__dirname, `./course-images/${req.query.name}.jpg`)
        )
    },

    makeOrder: async (req, res) => {
        if (
            !req.body.hasOwnProperty("username") ||
            !req.body.hasOwnProperty("course") ||
            !req.body.hasOwnProperty("keyword")
        ) {
            res.sendStatus(400)
        }

        try {
            const response1 = await pgClient.query(`select * from courses where courseName='${req.body.course.name}'`)

            if (response1.rowCount == 0) {
                res.statusMessage = "Invalid courseName"
                res.sendStatus(400)
                return
            }

            const response2 = await pgClient.query(`select * from orders where courseName='${req.body.course.name}' and username='${req.body.username}'`)

            if (response2.rowCount != 0) {
                res.statusMessage = "Order is already exists"
                res.sendStatus(400)
                return
            }

            const response3 = await pgClient.query(`select * from activated where courseName='${req.body.course.name}' and username='${req.body.username}'`)

            if (response3.rowCount != 0) {
                res.statusMessage = "Course is already activated"
                res.sendStatus(400)
                return
            }

            const settings = {
                amount: {
                    value: req.body.course.price,
                    currency: "RUB"
                },
                confirmation: {
                    type: "redirect",
                    return_url: "https://t.me/ZTOITSchoolOff_bot"
                },
                description: req.body.course.name
            }

            const response = await yookassa.createPayment(settings)

            createOrder(req.body.username, req.body.course.name, req.body.keyword, response.id)
                .then(() => {
                    res.send(response.confirmation.confirmation_url)
                })
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    },
    yookassaWebhook: async (req, res) => {
        res.sendStatus(200)

        console.log(req.body)
        console.log(req.body.event)

        if (req.body.event == "payment.succeeded") {
            console.log(req.body.object.id)
            payOrder(req.body.object.id)
        }
    }
}
