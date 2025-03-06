const isAuthenticated = (req, res, next) => {
    console.log("🔍 Verificando sesión:", req.session.user);
    if (!req.session.user || !req.session.user) {
        return res.redirect('/login');
    }
    next();
};

module.exports = isAuthenticated;