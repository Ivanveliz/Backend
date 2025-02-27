
const renderCreateUser = (req, res) => {
    res.render('layouts/auth', {
        body: 'pages/user/createUser',
        error: null,
        user: req.session.user || null,
    });

}


module.exports = {
    renderCreateUser,
}