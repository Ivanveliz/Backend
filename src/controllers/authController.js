const model = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const renderLogin = (req, res) => {
    res.render('layouts/main', {
        body: 'pages/auth',
        error: null
    });
}

const login = async (req, res) => {

    try {
        const { email, password } = req.body;

        // Validación de campos vacíos
        if (!email || !password) {
            return res.render("layouts/main", {
                body: 'pages/auth',
                error: 'Todos los campos son obligatorios'
            });
        }
        // Aquí iría la validación contra la base de datos
        const result = await model.verifyCredentials(email, password)
        console.log(result)

        if (result.error) {
            if (result.code === "USER_NOT_FOUND") {
                return res.render('layouts/main', {
                    body: 'pages/notRegister',
                    error: result.error
                })
            } else if (result.code === "INVALID_PASSWORD") {
                return res.render("layouts/main", {
                    body: "pages/auth",
                    error: result.error,
                });
            }

        }

        res.render('layouts/main', { body: 'pages/dashboard', result });

    } catch (error) {
        console.error("Error en el login:", error);
        res.render("layouts/main", {
            body: 'pages/auth',
            error: "Hubo un error, intenta nuevamente."
        });
    }
};


const dashboard = (req, res) => {
    // if (!req.session.userID) {
    //     return res.redirect('/auth')
    // }
    res.render('layouts/main', { body: 'pages/dashboard' });
}

const register = (req, res) => {
    res.render('layouts/main', { body: 'pages/register' });
}

//Verificacion de EMAIL
const verifyEmail = async (req, res) => {
    const { email } = req.body

    // Validación de campos vacíos
    if (!email) {
        return res.render("layouts/main", {
            body: 'pages/register',
            error: 'Todos los campos son obligatorios'
        });
    }

    try {
        const user = await model.findByEmail(email)

        if (!user) {
            return res.render('layouts/main', {
                body: 'pages/notRegister',
                error: 'El email no esta registrado'
            })
        }

        res.render('layouts/main', { body: 'pages/complete-registration', email });

    } catch (error) {
        res.status(500).send('Server error');

    }

}

const completeRegistration = async (req, res) => {

    const { name, surname, role, password, tel, property, email } = req.body;

    try {
        const update = await model.updateUserDetails(email, name, surname, role, password, tel, property)

        if (!update) {
            return res.render('layouts/main', { body: 'pages/notRegister' })
        }
        res.render('layouts/main', { body: '/pages/registration-success' })
    } catch (error) {
        throw error
    }
}

module.exports = {
    renderLogin,
    login,
    dashboard,
    register,
    verifyEmail,
    completeRegistration
}