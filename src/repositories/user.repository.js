const pool = require('../config/database');
module.exports = {
    async findByEmail(email) {
        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
        return rows[0] || null;
    }
};