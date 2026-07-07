const ExchangeRateRepository = require('../repositories/exchangeRate.repository');
const TestimonialRepository = require('../repositories/testimonial.repository');
const FaqRepository = require('../repositories/faq.repository');
const ContactRepository = require('../repositories/contact.repository');

module.exports = {
    async getExchangeRates(req, res, next) { try { res.json({ success: true, data: await ExchangeRateRepository.getAll() }); } catch (e) { next(e); } },
    async getTestimonials(req, res, next) { try { res.json({ success: true, data: await TestimonialRepository.getAll() }); } catch (e) { next(e); } },
    async getFaqs(req, res, next) { try { res.json({ success: true, data: await FaqRepository.getAll() }); } catch (e) { next(e); } },
    async submitContact(req, res, next) {
        try {
            await ContactRepository.insert(req.body.name, req.body.email, req.body.subject || '', req.body.message);
            res.status(201).json({ success: true, message: 'Terkirim!' });
        } catch (e) { next(e); }
    }
};