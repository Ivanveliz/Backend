const mysql = require('mysql2/promise');

//este modo de conexion pool hace que haya varias conexiones a la vez, por ende es mas eficiente.
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,


})

module.exports = pool