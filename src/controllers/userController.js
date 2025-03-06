const model = require('../models/user')

const renderCreateUser = (req, res) => {
    res.render('layouts/auth', {
        body: 'pages/user/createUser',
        error: null,
        user: req.session.user || null,
    });
    user = req.session.user
}


const createUser = async (req, res) => {
    const user = req.session.user
    console.log('usario en sesion:', user)
    const { email, name, surname } = req.body

    if (!email || !name || !surname) {
        return res.render("layouts/auth", {
            body: 'pages/user/createUser',
            error: 'Todos los campos son obligatorios',
            user,

        });
    }

    try {
        const newUser = await model.createUser(email)

        if (newUser.error) {
            if (newUser.code === "EMAIL_EXISTS") {
                return res.render('layouts/auth', {
                    body: 'pages/user/createUser',
                    error: newUser.error,
                    user
                })
            }
        }
        res.render('layouts/auth', {
            body: 'pages/complete-registration',
            error: newUser.error,
            user,

        });

        // Si el usuario se crea correctamente
        return res.render('layouts/auth', {
            body: 'pages/registration-success',
            user,

        });
    } catch (error) {
        console.error("Error en el controlador:", error);
        return res.status(500).render('layouts/auth', {
            body: 'pages/dashboard',
            error: 'Error en el servidor',
            user,
        });
    }
}



module.exports = {
    renderCreateUser,
    createUser,
}