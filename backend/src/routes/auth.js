
const router = require('express').Router();
const db = require('../db/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  const hash = await bcrypt.hash(password, 10);
  db.query(
    'INSERT INTO users(name,email,password,role) VALUES (?,?,?,?)',
    [name, email, hash, role],
    () => res.json({ message: 'Registered' })
  );
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email=?', [email], async (err, rows) => {
    if (!rows.length) return res.status(401).json({ message: 'Invalid' });
    const valid = await bcrypt.compare(password, rows[0].password);
    if (!valid) return res.status(401).json({ message: 'Invalid' });
    const token = jwt.sign({ id: rows[0].id, role: rows[0].role }, 'secret');
    res.json({ token, role: rows[0].role });
  });
});

module.exports = router;
