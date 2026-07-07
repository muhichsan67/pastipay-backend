const pool = require('../config/database');
module.exports = {
    async getAll() { const [rows] = await pool.execute('SELECT * FROM testimonials ORDER BY id DESC'); return rows; },
    async getById(id) { const [rows] = await pool.execute('SELECT * FROM testimonials WHERE id = ?', [id]); return rows[0] || null; },
    async create(name, position, company, content, rating, is_active) {
        await pool.execute(
            'INSERT INTO testimonials (name, position, company, content, rating, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())',
            [name, position, company, content, rating, is_active]
        );
    },
    async update(id, name, position, company, content, rating, is_active) {
        await pool.execute(
            'UPDATE testimonials SET name=?, position=?, company=?, content=?, rating=?, is_active=?, updated_at=NOW() WHERE id=?',
            [name, position, company, content, rating, is_active, id]
        );
    },
    async delete(id) { await pool.execute('DELETE FROM testimonials WHERE id=?', [id]); }
};