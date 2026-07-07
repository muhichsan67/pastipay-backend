const pool = require('../config/database');
module.exports = {
    async getAll() { const [rows] = await pool.execute('SELECT * FROM contact_submissions ORDER BY created_at DESC'); return rows; },
    async getById(id) { const [rows] = await pool.execute('SELECT * FROM contact_submissions WHERE id = ?', [id]); return rows[0] || null; },
    async insert(full_name, job_title, company_email, company_website, phone_number, estimated_volume, message) {
        await pool.execute(
            'INSERT INTO contact_submissions (full_name, job_title, company_email, company_website, phone_number, estimated_volume, message, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, \'Pending\', NOW(), NOW())',
            [full_name, job_title, company_email, company_website, phone_number, estimated_volume, message]
        );
    },
    async updateStatus(id, status) {
        await pool.execute('UPDATE contact_submissions SET status=?, updated_at=NOW() WHERE id=?', [status, id]);
    }
};