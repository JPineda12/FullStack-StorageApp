"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
exports.default = {
    database: {
        host: process.env.HOST_MYSQL,
        user: process.env.USER_MYSQL,
        password: process.env.PASSWORD_MYSQL,
        database: process.env.DATABASE_MYSQL,
    },
};
