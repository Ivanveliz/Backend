const bcrypt = require("bcryptjs");
const pool = require('../config/mysql'); // Importa tu conexión a la base de datos

const updatePasswords = async () => {
    try {
        // Obtiene todos los usuarios
        const [users] = await pool.execute("SELECT email, password FROM USER_LIFEGUARD");

        for (const user of users) {
            // Si la contraseña no está hasheada (asumimos que si tiene menos de 60 caracteres, no está hasheada)
            if (user.password.length < 60) {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                await pool.execute(
                    "UPDATE USER_LIFEGUARD SET password = ? WHERE email = ?",
                    [hashedPassword, user.email]
                );
                console.log(`Contraseña de ${user.email} actualizada`);
            }
        }

        console.log("Todas las contraseñas han sido actualizadas correctamente.");
    } catch (error) {
        console.error("Error actualizando las contraseñas:", error);
    } finally {
        pool.end(); // Cierra la conexión después de actualizar
    }
};

updatePasswords();
