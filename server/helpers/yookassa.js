const { v4: uuid } = require("uuid")
const axios = require("axios")

const auth = {
    password: "test_NAPWi_oX-DTOw_IN3aI3f7rNOXwcatdlJMdZbszmqLY",
    username: "429076"
}

const defaultHeaders = {
    "Content-Type": "application/json",
    "Idempotence-Key": uuid().toString()
}

module.exports = {
    createPayment: async (settings) => {
        const response = await axios.default.post("https://api.yookassa.ru/v3/payments", settings, {
            auth,
            headers: defaultHeaders
        })

        if (response.status == 200) {
            return response.data
        } else {
            console.error("Error while createPayment", response)
        }
    },
    acceptPayment: async (id) => {
        const response = await fetch(`https://api.yookassa.ru/v3/payments/${id}/capture`, {
            headers: {
                ...defaultHeaders,
                "Authorization": "Basic " + new Buffer(auth.username + ":" + user.password).toString("base64")
            },
        })

        if (response.status != 200) {
            console.error("Error while acceptPayment", response)
        }
    },
    cancelPayment: async (id) => {
        const response = await fetch(`https://api.yookassa.ru/v3/payments/${id}/cancel`, {
            headers: {
                ...defaultHeaders,
                "Authorization": "Basic " + new Buffer(auth.username + ":" + user.password).toString("base64")
            },
        })

        if (response.status != 200) {
            console.error("Error while acceptPayment", response)
        }
    }
}
