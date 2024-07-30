const pgClient = require("../pgClient")
const bcrypt = require("bcrypt")
const { salt } = require("../config")

module.exports = async function createOrder(username, coursename, keyword, paymentId) {
    return pgClient.query(
        `insert into orders values ('${username}', '${coursename
        }', '${await bcrypt.hash(
            keyword,
            salt
        )}', false, ${paymentId}, ${new Date().getTime()});`
    )
}
