// Delete application
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
var express = require('express');
var router = express.Router();
router.delete('/application/:id', async function(req, res) {
  if (!req.session.user) return res.status(401).json({ error: 'Not authenticated' });
  const { id } = req.params;
  try {
    const app = await prisma.application.findUnique({
      where: { id: Number(id) },
      include: { user: true }
    });
    if (!app || app.user.email !== req.session.user.email) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    await prisma.application.delete({ where: { id: Number(id) } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Could not delete application' });
  }
});
// Update application status

router.post('/application/:id/status', async function(req, res) {
  if (!req.session.user) return res.status(401).json({ error: 'Not authenticated' });
  const { id } = req.params;
  const { status } = req.body;
  try {
    const app = await prisma.application.findUnique({
      where: { id: Number(id) },
      include: { user: true }
    });
    if (!app || app.user.email !== req.session.user.email) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    await prisma.application.update({
      where: { id: Number(id) },
      data: { status }
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Could not update status' });
  }
});

// Dashboard route: show user's applications
router.get('/dashboard', async function(req, res) {
  if (!req.session.user) return res.redirect('/users/login');
  const user = await prisma.user.findUnique({
    where: { email: req.session.user.email },
    include: {
      applications: {
        include: { job: true },
        orderBy: { appliedDate: 'desc' }
      }
    }
  });
  res.render('dashboard', { applications: user ? user.applications : [] });
});


const hashAndStoreUser = require('../utils/hashAndStoreUser');
const { comparePassword } = require('../utils/hashAndStoreUser');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Render signup page
router.get('/signup', function(req, res) {
  res.render('signup');
});

// Handle signup form submission
router.post('/signup', async function(req, res) {
  const { username, email, password } = req.body;
  try {
    const user = await hashAndStoreUser(username, email, password);
    // Optionally, set session or redirect
    res.redirect('/users/login');
  } catch (err) {
    let errorMsg = 'Signup failed. Email or username may already be in use.';
    res.status(400).render('signup', { error: errorMsg });
  }
});

// Render login page
router.get('/login', function(req, res) {
  res.render('login');
});

// Handle login form submission
router.post('/login', async function(req, res) {
  const { email, password } = req.body;
  try {
    const valid = await comparePassword(email, password);
    if (valid) {
      req.session.user = { email };
      res.redirect('/');
    } else {
      res.status(401).render('login', { error: 'Invalid email or password.' });
    }
  } catch (err) {
    res.status(500).render('login', { error: 'An error occurred during login.' });
  }
});

// Logout route
router.get('/logout', function(req, res) {
  req.session.destroy(() => {
    res.redirect('/users/login');
  });
});

module.exports = router;
