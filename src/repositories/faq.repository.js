const pool = require('../config/database');
module.exports = {
    async getAll() { const [rows] = await pool.execute('SELECT * FROM faqs ORDER BY order_priority ASC, id ASC'); return rows; },
    async getById(id) { const [rows] = await pool.execute('SELECT * FROM faqs WHERE id = ?', [id]); return rows[0] || null; },
    async create(question, answer, order_priority) {
        await pool.execute(
            'INSERT INTO faqs (question, answer, order_priority, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
            [question, answer, order_priority || 0]
        );
    },
    async update(id, question, answer, order_priority) {
        await pool.execute(
            'UPDATE faqs SET question=?, answer=?, order_priority=?, updated_at=NOW() WHERE id=?',
            [question, answer, order_priority || 0, id]
        );
    },
    async delete(id) { await pool.execute('DELETE FROM faqs WHERE id=?', [id]); }
};