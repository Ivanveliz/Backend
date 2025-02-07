const pool = require('../config/mysql');

async function findAlluser() {
    try {
        const [rows] = await pool.query('SELECT * FROM USER_LIFEGUARD');
        return rows;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error;
    }
}

//modelo de verificacion de EMAIL
const findByEmail = async (email) => {
    const sql = `SELECT * FROM USER_LIFEGUARD WHERE email = ?`

    try {
        const [rows] = await pool.query(sql, [email])
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        throw error;
    }
}

//actualizar usuario segun email

const updateUserDetails = async (name, surname, role, password, tel, property, email) => {
    const sql = `UPDATE USER_LIFEGUARD SET name = ?, surname = ?, role = ?, password = ?, tel = ?, property = ? WHERE email = ?`
    try {
        const [rows] = await pool.query(sql, [email])
        return result.affectedRows > 0;
    } catch (error) {
        throw error;
    }
}
module.exports = {
    findAlluser,
    findByEmail,
    updateUserDetails
};

