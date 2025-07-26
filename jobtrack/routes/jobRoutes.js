const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/search', jobController.searchJobs);
router.get('/categories', jobController.getJobCategories);
router.get('/:id', jobController.getJobById);

// Protected routes - require authentication
router.use(authMiddleware.protect);

// Job fetching and management
router.post('/fetch-remote', jobController.fetchRemoteJobs);
router.get('/recommended', jobController.getRecommendedJobs);

// Saved jobs
router.get('/saved', jobController.getSavedJobs);
router.post('/:id/save', jobController.saveJob);
router.delete('/saved/:id', jobController.unsaveJob);
router.patch('/saved/:id/notes', jobController.updateSavedJobNotes);

// Job applications
router.get('/applications', jobController.getApplications);
router.post('/:id/apply', jobController.createApplication);
router.patch('/applications/:id', jobController.updateApplication);
router.delete('/applications/:id', jobController.deleteApplication);
router.get('/applications/:id', jobController.getApplicationById);

// Job statistics
router.get('/stats/applications', jobController.getApplicationStats);
router.get('/stats/categories', jobController.getCategoryStats);

module.exports = router; 