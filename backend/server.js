const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./db');

const app = express();
const port = 5000;

app.use(cors({
    origin: 'http://localhost:3000', // React app URL
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000, httpOnly: true }
}));

// API Routes

// Register
app.post('/register', (req, res) => {
    const { email, password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).send("Error hashing password.");
        db.run(`INSERT INTO users (email, password) VALUES (?, ?)`, [email, hash], function(err) {
            if (err) {
                if (err.message.includes("UNIQUE constraint failed: users.email")) {
                    return res.status(409).send("Email already exists.");
                }
                return res.status(500).send("Registration failed.");
            }
            res.status(201).send("User registered successfully.");
        });
    });
});

// Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
        if (err || !user) {
            return res.status(401).send("Invalid email or password.");
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                req.session.userId = user.id;
                res.status(200).send("Logged in successfully.");
            } else {
                res.status(401).send("Invalid email or password.");
            }
        });
    });
});

// Protected route
app.get('/dashboard', (req, res) => {
    if (req.session.userId) {
        res.status(200).json({ message: "Welcome to the dashboard!", userId: req.session.userId });
    } else {
        res.status(401).send("Unauthorized. Please log in.");
    }
});

// Logout
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send("Could not log out.");
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.status(200).send("Logged out successfully.");
    });
});

app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});