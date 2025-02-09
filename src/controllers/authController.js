const model = require('../models/user')

const renderLogin = (req, res) => {
    res.render('layouts/main', { body: 'pages/auth', error: null });
}

const login = (req, res) => {

    try {
        const { email, password } = req.body;
        console.log(email, password)
        // Validación de campos vacíos
        if (!email || !password) {
            return res.render("layouts/main", {
                body: 'pages/auth',
                error: 'Todos los campos son obligatorios'
            });
        }
        // Aquí iría la validación contra la base de datos
        res.render('layouts/main', { body: 'pages/auth' })

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

const verifyEmail = async (req, res) => {
    const { email } = req.body


    try {
        const user = await model.findByEmail(email)
        console.log(user)
        const userID = user.id
        console.log(userID)

        if (!user) {
            return res.render('layouts/main', { body: 'pages/notRegister' })
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