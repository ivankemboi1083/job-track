const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Save applied job
router.post('/apply', async (req, res) => {
  if (!req.session.user) return res.status(401).json({ error: 'Not authenticated' });
  const { jobTitle, company, location, url, category, jobType } = req.body;
  try {
    // Create or find job
    let job = await prisma.job.findFirst({
      where: { url },
    });
    if (!job) {
      job = await prisma.job.create({
        data: {
          user: { connect: { email: req.session.user.email } },
          jobTitle,
          company,
          location,
          source: 'remotive',
          url,
        },
      });
    }
    // Create application
    await prisma.application.create({
      data: {
        user: { connect: { email: req.session.user.email } },
        job: { connect: { id: job.id } },
        status: 'applied',
        appliedDate: new Date(),
      },
    });
    return res.redirect('/users/dashboard');
  } catch (err) {
    res.status(500).json({ error: 'Could not save job' });
  }
});

module.exports = router;
