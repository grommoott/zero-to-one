const { Client } = require("pg")

function client() {
    const pgClient = new Client({
        database: "database_70or",
        user: "admin",
        password: "Mi2LiYcabG8gpLwG8MvQPnt1CjtTVBvb",
        host: "a.oregon-postgres.render.com",
        ssl: {
            rejectUnauthorized: false
        }
    })
    
    pgClient.connect()

    return pgClient
}

module.exports = client()