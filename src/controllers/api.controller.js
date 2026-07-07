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
            const {
                full_name,
                job_title,
                company_email,
                company_website,
                phone_number,
                estimated_volume,
                message
            } = req.body;
            await ContactRepository.insert(
                full_name,
                job_title ?? "Default",
                company_email,
                company_website ?? null,
                phone_number,
                estimated_volume,
                message ?? null
            );
            res.status(201).json({ success: true, message: 'Terkirim!' });
        } catch (e) { next(e); }
    }
};