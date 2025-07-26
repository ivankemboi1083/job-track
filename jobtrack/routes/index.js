
var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */

// Fetch jobs from Remotive API and render homepage
router.get('/', async function(req, res, next) {
  if (!req.session.user) {
    // Not logged in: show welcome/CTA only
    return res.render('index', {
      title: 'Job Track',
      jobs: null,
      error: null,
      guest: true,
      search: req.query.search || ''
    });
  }
  let jobs = [];
  let error = null;
  const search = req.query.search || '';
  try {
    const apiUrl = search
      ? `https://remotive.com/api/remote-jobs?search=${encodeURIComponent(search)}`
      : 'https://remotive.com/api/remote-jobs';
    const response = await axios.get(apiUrl);
    jobs = response.data.jobs ? response.data.jobs.slice(0, 12) : [];
  } catch (err) {
    error = 'Could not fetch jobs at this time.';
  }
  res.render('index', {
    title: 'Job Track',
    jobs,
    error,
    guest: false,
    search
  });
});

module.exports = router;
