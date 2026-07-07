const router = require('express').Router();
const ApiController = require('../controllers/api.controller');
const { verifyEncryptedToken } = require('../middlewares/auth.middleware');
const { apiDataLimiter, contactSubmitLimiter } = require('../middlewares/limiter.middleware');
const { validateContact, checkApiValidationError } = require('../middlewares/validator.middleware');

router.get('/exchange-rates', apiDataLimiter, verifyEncryptedToken, ApiController.getExchangeRates);
router.get('/testimonials', apiDataLimiter, verifyEncryptedToken, ApiController.getTestimonials);
router.get('/faqs', apiDataLimiter, verifyEncryptedToken, ApiController.getFaqs);
router.post('/contact/submit', contactSubmitLimiter, validateContact, checkApiValidationError, ApiController.submitContact);

module.exports = router;