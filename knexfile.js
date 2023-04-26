require("dotenv").config();

module.exports = {
        client: 'mysql',
        connection: {
        host: '127.0.0.1',
        user: process.env.DB_LOCAL_USER,
        password: process.env.DB_LOCAL_PASSWORD,
        database: 'in_stock',
        charset: 'utf8'
        },
    };

