const pgClient = require("../pgClient")
const bcrypt = require("bcrypt")
const { salt } = require("../config")

module.exports = async function payOrder(id) {
    return pgClient.query(`update orders set ispaid=true where paymentid='${id}'`)
}
