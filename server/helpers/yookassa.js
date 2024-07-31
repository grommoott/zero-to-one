const { randomUUID } = require("crypto")
const axios = require("axios")

const auth = {
    password: "test_NAPWi_oX-DTOw_IN3aI3f7rNOXwcatdlJMdZbszmqLY",
    username: "429076"
}

const defaultHeaders = {
    "Content-Type": "application/json",
    "Idempotence-Key": randomUUID()
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
        const response = await axios.default.post(`https://api.yookassa.ru/v3/payments/${id}/capture`, {}, {
            headers: defaultHeaders,
            auth
        })

        if (response.status != 200) {
            console.error("Error while acceptPayment", response)
        }
    },
    cancelPayment: async (id) => {
        const response = await axios.default.post(`https://api.yookassa.ru/v3/payments/${id}/cancel`, {}, {
            headers: defaultHeaders,
            auth
        })

        if (response.status != 200) {
            console.error("Error while acceptPayment", response)
        }
    }
}
