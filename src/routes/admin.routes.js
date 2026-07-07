const router = require('express').Router();
const AdminController = require('../controllers/admin.controller');
const { isAdmin } = require('../middlewares/auth.middleware');
const { validateTestimonial, validateFaq, checkAdminValidationError } = require('../middlewares/validator.middleware');

router.get('/login', AdminController.renderLogin);
router.post('/login', AdminController.handleLogin);
router.get('/logout', AdminController.handleLogout);
router.get('/dashboard', isAdmin, AdminController.renderDashboard);

// Exchange Rates
router.post('/fetch-rate', isAdmin, AdminController.triggerFetchRate);
router.post('/rates/delete/:id', isAdmin, AdminController.deleteRate);

// Testimonials
router.post('/testimonials/save', isAdmin, validateTestimonial, checkAdminValidationError, AdminController.saveTestimonial);
router.post('/testimonials/delete/:id', isAdmin, AdminController.deleteTestimonial);

// FAQs
router.post('/faqs/save', isAdmin, validateFaq, checkAdminValidationError, AdminController.saveFaq);
router.post('/faqs/delete/:id', isAdmin, AdminController.deleteFaq);

// Contacts
router.post('/contacts/status/:id', isAdmin, AdminController.updateContactStatus);

module.exports = router;
