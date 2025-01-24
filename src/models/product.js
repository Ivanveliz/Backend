const pool = require('./mysql')

//modelo para crear un producto.
const store = async (name) => {
    const sql = `INSERT INTO products (name) VALUES (?)`

    try {
        const [result] = await pool.query(sql, [name])
        return result
    } catch (error) {
        throw error
    }
}


//modelo para traer todos los productos a pantalla
const findAll = async () => {
    const sql = `SELECT * FROM products`

    try {
        const [rows] = await pool.query(sql)
        return rows
    } catch (error) {
        throw error
    }
}
module.exports = {
    store,
    findAll,

}