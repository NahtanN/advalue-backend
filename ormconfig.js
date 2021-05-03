module.exports = {
    "type": "mongodb",
    "url": process.env.DATABASE_URL,
    "useCreateIndex": true,
    "useNewUrlParser": true,
    "useUnifiedTopology": true,
    "extra": {
        "ssl": {
            "rejectUnauthorized": false
        }
    }
}