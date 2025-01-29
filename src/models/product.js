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



//modelo para traer 1 prodcto
const findById = async (id) => {
    const sql = `SELECT * FROM products WHERE product_id = ?`

    try {
        const [rows] = await pool.query(sql, [id])
        return rows.shift()

    } catch (error) {
        throw error
    }

}


//modelo para la edicion del producto
const update = async (id, name) => {
    const sql = `UPDATE products SET name = ? WHERE product_id = ?`
    try {
        const [result] = await pool.query(sql, [name, id])
        return result
    } catch (error) {
        throw error
    }
}

const destroy = async (id) => {
    const sql = `DELETE FROM products WHERE product_id = ?`

    try {
        const result = await pool.query(sql, [id])
        return result
    } catch (error) {
        throw error
    }
}
module.exports = {
    store,
    findAll,
    findById,
    update,
    destroy
}