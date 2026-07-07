const pool = require('../config/database');
module.exports = {
    async getAll() {
        const [rows] = await pool.execute('SELECT * FROM exchange_rates ORDER BY created_at DESC');
        return rows;
    },
    async create(from_currency, to_currency, rate) {
        await pool.execute(
            'INSERT INTO exchange_rates (from_currency, to_currency, rate, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
            [from_currency, to_currency, rate]
        );
    },
    async delete(id) { await pool.execute('DELETE FROM exchange_rates WHERE id=?', [id]); }
};