// server.js
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'vape_x'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

const secretKey = 'your_secret_key';

app.post('/register', (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err, results) => {
        if (err) return res.status(500).send('Server error');
        res.status(200).send('User registered successfully');
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) return res.status(500).send('Server error');
        if (results.length === 0) return res.status(404).send('User not found');

        const user = results[0];
        const isValidPassword = bcrypt.compareSync(password, user.password);

        if (!isValidPassword) return res.status(401).send('Invalid credentials');

        const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
        res.status(200).send({ auth: true, token });
    });
});

app.post('/logout', (req, res) => {
    res.status(200).send({ auth: false, token: null });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

