const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// All routes require authentication
router.use(authMiddleware.protect);

// Profile management
router.get('/profile', userController.getProfile);
router.patch('/profile', [
  body('email').optional().isEmail().withMessage('Please enter a valid email'),
  body('firstName').optional().trim().notEmpty().withMessage('First name cannot be empty'),
  body('lastName').optional().trim().notEmpty().withMessage('Last name cannot be empty'),
], userController.updateProfile);

// Skills management
router.get('/skills', userController.getSkills);
router.post('/skills', [
  body('skills').isArray().withMessage('Skills must be an array'),
], userController.updateSkills);

// Dashboard data
router.get('/dashboard', userController.getDashboardData);
router.get('/activity', userController.getActivityLog);

// Preferences
router.get('/preferences', userController.getPreferences);
router.patch('/preferences', userController.updatePreferences);

// Account management
router.patch('/password', [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long'),
], userController.updatePassword);

router.delete('/account', userController.deleteAccount);

module.exports = router;
