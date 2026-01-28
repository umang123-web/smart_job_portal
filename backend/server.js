
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/auth', require('./src/routes/auth'));
app.use('/jobs', require('./src/routes/jobs'));
app.use('/applications', require('./src/routes/applications'));

app.listen(5000, () => console.log('Backend running on http://localhost:5000'));
