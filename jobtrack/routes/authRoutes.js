const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Validation middleware
const validateSignup = [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

const validateLogin = [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Auth routes
router.post('/signup', validateSignup, authController.signup);
router.post('/login', validateLogin, authController.login);
router.post('/logout', authController.logout);
router.get('/me', authMiddleware.protect, authController.getCurrentUser);

// Social auth routes
router.post('/github', authController.githubAuth);
router.post('/linkedin', authController.linkedinAuth);

// Password management
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);

module.exports = router; 