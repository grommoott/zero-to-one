const pgClient = require("./pgClient");

class OverdueOrderDestroyer {
    constructor(interval, maxOffset) {
        this.maxOffset = maxOffset

        setInterval(() => {
            this.destroy()
        }, interval)
    }

    destroy() {
        const date = new Date().getTime()
        pgClient.query(`delete from orders where moment<${date - this.maxOffset}`)
    }
}

module.exports = new OverdueOrderDestroyer(60_000, 60_000)
