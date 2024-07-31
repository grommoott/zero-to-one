const pgClient = require("./pgClient");
const yookassa = require("./helpers/yookassa")

class OverdueOrderDestroyer {
    constructor(interval, maxOffset) {
        this.maxOffset = maxOffset

        setInterval(() => {
            this.destroy()
        }, interval)
    }

    destroy() {
        const date = new Date().getTime()
        const orders = pgClient.query(`select * from orders where moment<${date - this.maxOffset}`)

        for (let order of orders) {
            yookassa.cancelPayment(order.paymentId)
        }

        pgClient.query(`delete from orders where moment<${date - this.maxOffset}`)
    }
}

module.exports = new OverdueOrderDestroyer(60_000, 3600_000)
