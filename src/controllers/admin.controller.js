const bcrypt = require('bcryptjs');
const UserRepository = require('../repositories/user.repository');
const ExchangeRateRepository = require('../repositories/exchangeRate.repository');
const TestimonialRepository = require('../repositories/testimonial.repository');
const FaqRepository = require('../repositories/faq.repository');
const ContactRepository = require('../repositories/contact.repository');
const FixerService = require('../services/fixer.service');

module.exports = {
    renderLogin(req, res) {
        if (req.session.adminId) return res.redirect('/admin/dashboard');
        res.render('login', { error: null });
    },

    async handleLogin(req, res, next) {
        try {
            const user = await UserRepository.findByEmail(req.body.email);
            if (!user || !bcrypt.compareSync(req.body.password, user.password))
                return res.render('login', { error: 'Email atau password salah!' });
            req.session.adminId = user.id;
            req.session.adminName = user.name;
            res.redirect('/admin/dashboard');
        } catch (e) { next(e); }
    },

    async renderDashboard(req, res, next) {
        try {
            let data = {}, editData = null;
            const tab = req.query.tab || 'rates';
            const editId = req.query.editId;

            if (tab === 'rates') data.rates = await ExchangeRateRepository.getAll();
            if (tab === 'testimonials') {
                data.testimonials = await TestimonialRepository.getAll();
                if (editId) editData = await TestimonialRepository.getById(editId);
            }
            if (tab === 'faqs') {
                data.faqs = await FaqRepository.getAll();
                if (editId) editData = await FaqRepository.getById(editId);
            }
            if (tab === 'contacts') data.contacts = await ContactRepository.getAll();

            res.render('dashboard', {
                adminName: req.session.adminName,
                tab,
                data,
                editData,
                message: req.query.msg || null,
                msgType: req.query.msgType || 'success'
            });
        } catch (e) { next(e); }
    },

    async saveTestimonial(req, res, next) {
        try {
            const { id, name, position, company, content, rating, is_active } = req.body;
            const activeVal = is_active === '1' ? 1 : 0;
            if (id) {
                await TestimonialRepository.update(id, name, position, company, content, rating, activeVal);
            } else {
                await TestimonialRepository.create(name, position, company, content, rating, activeVal);
            }
            res.redirect('/admin/dashboard?tab=testimonials&msg=Testimonial berhasil disimpan&msgType=success');
        } catch (e) { next(e); }
    },

    async deleteTestimonial(req, res, next) {
        try {
            await TestimonialRepository.delete(req.params.id);
            res.redirect('/admin/dashboard?tab=testimonials&msg=Testimonial berhasil dihapus&msgType=warning');
        } catch (e) { next(e); }
    },

    async saveFaq(req, res, next) {
        try {
            const { id, question, answer, order_priority } = req.body;
            if (id) {
                await FaqRepository.update(id, question, answer, order_priority);
            } else {
                await FaqRepository.create(question, answer, order_priority);
            }
            res.redirect('/admin/dashboard?tab=faqs&msg=FAQ berhasil disimpan&msgType=success');
        } catch (e) { next(e); }
    },

    async deleteFaq(req, res, next) {
        try {
            await FaqRepository.delete(req.params.id);
            res.redirect('/admin/dashboard?tab=faqs&msg=FAQ berhasil dihapus&msgType=warning');
        } catch (e) { next(e); }
    },

    async updateContactStatus(req, res, next) {
        try {
            const { status } = req.body;
            await ContactRepository.updateStatus(req.params.id, status);
            res.redirect('/admin/dashboard?tab=contacts&msg=Status kontak diperbarui&msgType=success');
        } catch (e) { next(e); }
    },

    async triggerFetchRate(req, res, next) {
        try {
            await FixerService.fetchAndSaveLatestRate();
            res.redirect('/admin/dashboard?tab=rates&msg=Data kurs berhasil diperbarui&msgType=success');
        } catch (e) { next(e); }
    },

    async deleteRate(req, res, next) {
        try {
            await ExchangeRateRepository.delete(req.params.id);
            res.redirect('/admin/dashboard?tab=rates&msg=Data kurs dihapus&msgType=warning');
        } catch (e) { next(e); }
    },

    handleLogout(req, res) {
        req.session.destroy(() => res.redirect('/admin/login'));
    }
};
