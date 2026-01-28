const express = require("express");
const router = express.Router();
const pool = require("../db/db"); // mysql2/promise

// GET all jobs
router.get("/", async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM jobs");
    res.json(results);
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ message: "DB error" });
  }
});

// GET job by ID
router.get("/:id", async (req, res) => {
  const jobId = req.params.id;

  try {
    const [results] = await pool.query("SELECT * FROM jobs WHERE id = ?", [jobId]);

    if (results.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(results[0]);
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ message: "DB error" });
  }
});

module.exports = router;
