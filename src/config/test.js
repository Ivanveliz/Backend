const mysql = require('mysql2/promise');
const pool = require('../config/mysql')
// Verifica la conexión
const testConnection = async () => {
    try {
        const [rows] = await pool.query("SELECT 1");
        console.log("Conexión exitosa:", rows);
    } catch (error) {
        console.error("Error en la conexión:", error);
    }
};

testConnection();
