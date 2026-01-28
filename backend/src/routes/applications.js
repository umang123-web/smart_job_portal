const express = require("express");
const router = express.Router();
const pool = require("../db/db");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const { job_id, user_id } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    const resumePath = req.file.filename;

    // No callback, use await
    await pool.query(
      "INSERT INTO applications (job_id, user_id, resume) VALUES (?, ?, ?)",
      [job_id, user_id, resumePath]
    );

    res.json({ message: "Application submitted successfully" });
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ message: "DB error" });
  }
});

module.exports = router;
