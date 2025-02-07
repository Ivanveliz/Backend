const pool = require('../src/config/mysql'); // Asegúrate de poner la ruta correcta

async function testDBConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Conectado a la base de datos');

        const [rows] = await connection.execute('SELECT 1'); // Consulta simple para probar la conexión
        console.log('🔍 Resultado de prueba:', rows);

        connection.release(); // Liberar la conexión
    } catch (error) {
        console.error('❌ Error al conectar a la base de datos:', error.message);
    }
}

testDBConnection();
