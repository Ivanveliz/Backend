const authMiddleware = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/login'); // Redirige al login si no hay sesión
    }
    next();
};

module.exports = authMiddleware;