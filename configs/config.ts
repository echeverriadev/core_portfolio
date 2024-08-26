export default {
    "db": {
        user: process.env.MONGO_USERNAME || '',
        pass: process.env.MONGO_PASSWORD || '',
        host: process.env.MONGO_HOST || 'localhost',
        port: process.env.MONGO_PORT || '27017',
        database: process.env.MONGO_DATABASE || 'your_default_database',
        authSource: process.env.MONGO_AUTH_SOURCE || 'admin',
    },
    "host": {
        "url": process.env.HOST_URL || "<server-url>",
        "port": process.env.HOST_PORT || "3000"
    },
    "jwt": {
        "secretOrKey": process.env.JWT_SECRET || "secret",
        "expiresIn": process.env.JWT_EXPIRES_IN || 36000000
    },
}
