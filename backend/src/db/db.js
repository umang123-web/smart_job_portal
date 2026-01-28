// @ts-nocheck
// Old: const mysql = require("mysql2");
const mysql = require("mysql2/promise"); // <-- use promise wrapper

// Create the pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "MYpapa@5",
  database: "smart_job_portal",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
