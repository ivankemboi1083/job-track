const express = require("express");
const axios = require("axios");
const { Job } = require("../models");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

// Fetch jobs from Jobicy API
const fetchJobicyJobs = async () => {
  try {
    const response = await axios.get("https://jobicy.com/api/v2/remote-jobs");
    const jobs = response.data.jobs || [];

    return jobs.map((job) => ({
      title: job.title || "No Title",
      company: job.company.name || "Unknown Company",
      location: job.location || "Remote",
      url: job.url || "#",
      source: "Jobicy",
      description: job.description || "",
      salary: job.salary || null,
      jobType: job.type || "Full-time",
      isRemote: true,
      externalId: `jobicy_${job.id}`,
    }));
  } catch (error) {
    console.error("Error fetching Jobicy jobs:", error);
    return [];
  }
};

// Refresh jobs from Jobicy API
router.post("/refresh", authenticateToken, async (req, res) => {
  try {
    // Fetch jobs from Jobicy API only
    const jobicyJobs = await fetchJobicyJobs();

    // Save jobs to database (avoid duplicates)
    let savedCount = 0;
    for (const jobData of jobicyJobs) {
      try {
        const [job, created] = await Job.findOrCreate({
          where: { externalId: jobData.externalId },
          defaults: jobData,
        });
        if (created) savedCount++;
      } catch (error) {
        console.error("Error saving job:", error);
      }
    }

    res.json({
      message: `Jobs refreshed successfully. ${savedCount} new jobs added.`,
      totalFetched: jobicyJobs.length,
      newJobs: savedCount,
    });
  } catch (error) {
    console.error("Error refreshing jobs:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
