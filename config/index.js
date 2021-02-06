require('dotenv').config({path:'.env'})

 module.exports = {
    mongo: {
        host: process.env.MONGO_HOST,
        port: process.env.MONGO_PORT,
        username: process.env.MONGO_USERNAME,
        password: process.env.MONGO_PASSWORD,
        db: process.env.MONGO_DB
    },
     auth: {
        secretKey: process.env.AUTH_SECRET_KEY
     }
}
