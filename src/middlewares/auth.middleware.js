const jwt = require('jsonwebtoken');

const verifyEncryptedToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'Token kosong!' });

    try {
        req.frontendApp = jwt.verify(token, process.env.API_SECRET_TOKEN);
        next();
    } catch (error) {
        return res.status(403).json({ success: false, message: 'Token tidak valid.' });
    }
};

const isAdmin = (req, res, next) => {
    if (req.session && req.session.adminId) next();
    else res.redirect('/admin/login');
};

module.exports = { verifyEncryptedToken, isAdmin };