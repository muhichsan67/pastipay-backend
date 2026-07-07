const { body, validationResult } = require('express-validator');

const validateTestimonial = [
    body('id').optional().isInt(),
    body('name').trim().notEmpty().withMessage('Nama wajib diisi.').escape(),
    body('position').trim().notEmpty().withMessage('Jabatan wajib diisi.').escape(),
    body('company').trim().notEmpty().withMessage('Perusahaan wajib diisi.').escape(),
    body('content').trim().notEmpty().withMessage('Konten wajib diisi.').escape(),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating harus 1-5.'),
    body('is_active').optional().isIn(['0', '1'])
];

const validateFaq = [
    body('id').optional().isInt(),
    body('question').trim().notEmpty().withMessage('Pertanyaan wajib diisi.').escape(),
    body('answer').trim().notEmpty().withMessage('Jawaban wajib diisi.').escape(),
    body('order_priority').optional().isInt({ min: 0 })
];

const validateContact = [
    body('full_name').trim().notEmpty().escape(),
    body('company_email').trim().isEmail().normalizeEmail(),
    body('message').trim().notEmpty().escape()
];

const checkApiValidationError = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
    next();
};

const checkAdminValidationError = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const tab = req.path.includes('testimonials') ? 'testimonials' : 'faqs';
        return res.redirect(`/admin/dashboard?tab=${tab}&msg=${encodeURIComponent(errors.array()[0].msg)}`);
    }
    next();
};

module.exports = { validateTestimonial, validateFaq, validateContact, checkApiValidationError, checkAdminValidationError };
