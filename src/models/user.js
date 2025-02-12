const pool = require('../config/mysql');
const { comparePassword } = require('../helpers/hashHelper')
const { hashPassword } = require('../helpers/hashHelper')

async function findAlluser() {
    try {
        const [rows] = await pool.query('SELECT * FROM USER_LIFEGUARD');
        return rows;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error;
    }
}

//modelo de verificación de EMAIL y PASSWORD
const verifyCredentials = async (email, password) => {
    const sql = `SELECT * FROM USER_LIFEGUARD WHERE email = ?`

    try {
        const [rows] = await pool.query(sql, [email])
        console.log("Resultado de la consulta:", rows);
        if (rows.length === 0) {
            return {
                error: "El usuario no existe",
                code: "USER_NOT_FOUND"
            }
        }

        const user = rows[0]

        // Compara la contraseña ingresada con la almacenada en la BD
        const isMatch = await comparePassword(password, user.password)
        if (!isMatch) {
            return {
                error: "Contraseña incorrecta",
                code: "INVALID_PASSWORD"
            };
        }
        return { user }

    } catch (error) {
        console.error("Error verificando credenciales:", error);
        return { error: "Error en la base de datos", code: "DB_ERROR" };
    }
}


//modelo de verificacion de EMAIL
const findByEmail = async (email) => {
    const sql = `SELECT * FROM USER_LIFEGUARD WHERE email = ?`

    try {
        const [rows] = await pool.query(sql, [email])
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error("Error buscando usuario por email:", error);
        throw error;
    }
}

//actualizar usuario segun email

const updateUserDetails = async (email, name, surname, role, password, tel, property) => {

    const hashedPassword = await hashPassword(password)
    const sql = `UPDATE USER_LIFEGUARD SET name = ?, surname = ?, role = ?, password = ?, tel = ?, property = ? WHERE email = ?`

    try {
        const [result] = await pool.query(sql, [name, surname, role, hashedPassword, tel, property, email])

        console.log("Filas afectadas:", result.affectedRows);
        return result.affectedRows > 0;

    } catch (error) {
        console.error("Error actualizando usuario:", error);
        throw error;
    }
}
module.exports = {
    verifyCredentials,
    findAlluser,
    findByEmail,
    updateUserDetails
};

