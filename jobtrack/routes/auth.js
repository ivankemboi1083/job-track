const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const { User, Job } = require("../models");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

// Register route with validation and password hashing
router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, email, password, role = "user" } = req.body;
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, passwordHash, role });
      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      res.status(201).json({
        message: "User created successfully",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Login route with bcrypt password check
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get current user
router.get("/me", authenticateToken, async (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      resumeUrl: req.user.resumeUrl,
    },
  });
});

// Job CRUD routes for tracking applications
router.get("/jobs", authenticateToken, async (req, res) => {
  const jobs = await Job.findAll({ where: { userId: req.user.id } });
  res.json(jobs);
});

router.post("/jobs/save", authenticateToken, async (req, res) => {
  try {
    const jobData = { ...req.body, userId: req.user.id, status: "saved" };
    const job = await Job.create(jobData);
    res.json({ message: "Job saved", job });
  } catch (error) {
    res.status(500).json({ message: "Error saving job" });
  }
});

router.put("/jobs/:id", authenticateToken, async (req, res) => {
  try {
    const job = await Job.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!job) return res.status(404).json({ message: "Job not found" });
    await job.update(req.body);
    res.json({ message: "Job updated", job });
  } catch (error) {
    res.status(500).json({ message: "Error updating job" });
  }
});

router.delete("/jobs/:id", authenticateToken, async (req, res) => {
  try {
    const job = await Job.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!job) return res.status(404).json({ message: "Job not found" });
    await job.destroy();
    res.json({ message: "Job deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job" });
  }
});

module.exports = router;
