const path = require('path')
const sqlite = require('sqlite3')

const db = new sqlite.Database
    (path.resolve(__dirname, '../../database.db'),
        (error) => {
            if (error) {
                console.error('Error al abrir la base de datos:', error);
            } else
                console.log('Base de datos conectada exitosamente')

            //COnsulta SQL
            const sql = `CREATE TABLE IF NOT EXISTS categories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(100) NOT NULL)`

            db.run(sql, (error) => {
                return console.error(error)
            })
        }

    )

module.exports = db