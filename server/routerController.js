const path = require("path")
const pgClient = require("./pgClient")
const bcrypt = require("bcrypt")
const { salt } = require("./config")

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
            path.join(__dirname, `../dist/courses/${req.query.name}.jpg`)
        )
    },

    makeOrder: async (req, res) => {
        if (
            !req.body.hasOwnProperty("username") ||
            !req.body.hasOwnProperty("courseName") ||
            !req.body.hasOwnProperty("keyword")
        ) {
            res.sendStatus(400)
        }

        try {
            const response1 = await pgClient.query(`select * from courses where courseName='${req.body.courseName}'`)

            if (response1.rows.length == 0) {
                res.statusMessage = "Invalid courseName"
                res.sendStatus(400)
                return
            }

            const response2 = await pgClient.query(`select * from orders where courseName='${req.body.courseName}' and username='${req.body.username}'`)

            if (response2.rows.length != 0) {
                res.statusMessage = "Order is already exists"
                res.sendStatus(400)
                return
            }

            const response3 = await pgClient.query(`select * from activated where courseName='${req.body.courseName}' and username='${req.body.username}'`)

            if (response3.rows.length != 0) {
                res.statusMessage = "Course is already activated"
                res.sendStatus(400)
                return
            }

            pgClient.query(
                `insert into orders values ('${req.body.username}', '${
                    req.body.courseName
                }', '${await bcrypt.hash(
                    req.body.keyword,
                    salt
                )}', ${new Date().getTime()});`
            )
            res.sendStatus(200)
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    },
}
