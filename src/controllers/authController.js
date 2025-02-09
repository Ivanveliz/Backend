const model = require('../models/user')


const login = (req, res) => {
    res.render('layouts/auth', { body: 'pages/auth' });
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
    console.log("Email recibido:", email);
    try {
        const user = await model.findByEmail(email)
        console.log(user)

        if (!user) {
            return res.render('layouts/main', { body: 'pages/notRegister' })
        }

        res.render('layouts/main', { body: 'pages/complete-registration', email });


    } catch (error) {
        res.status(500).send('Server error');

    }

}

const completeRegistration = () => {
    const { name, surname, role, password, tel, property, email } = req.body;

    try {
        const update = model.updateUserDetails(email, name, surname, role, password, tel, property)

        if (!update) {
            return res.render('layouts/main', { body: 'pages/notRegister' })
        }
        res.render('registration-success')
    } catch (error) {

    }
}

module.exports = {
    login,
    dashboard,
    register,
    verifyEmail,
    completeRegistration
}