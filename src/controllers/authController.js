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

module.exports = {
    login,
    dashboard,
    register,
}