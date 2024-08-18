// app.js
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3000;

// Mock database for demonstration purposes
const users = [
    { id: 1, username: 'admin', password: '$2a$10$4sd83jsd93jha', role: 'admin' }, // hashed password
    { id: 2, username: 'instructor', password: '$2a$10$9asdas9dfasf', role: 'instructor' },
    { id: 3, username: 'student', password: '$2a$10$7s8asd7f76d5f', role: 'student' }
];

app.use(bodyParser.json());
app.use(express.static('public')); // For serving static files like HTML

// Authentication route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(400).json({ success: false, message: 'Invalid username or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Invalid username or password.' });
    }

    // Generate JWT token (for real applications, use a secret key)
    const token = jwt.sign({ id: user.id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });

    let redirectUrl;
    switch (user.role) {
        case 'admin':
            redirectUrl = '/admin-dashboard';
            break;
        case 'instructor':
            redirectUrl = '/instructor-dashboard';
            break;
        case 'student':
            redirectUrl = '/student-dashboard';
            break;
        default:
            return res.status(400).json({ success: false, message: 'Unknown role.' });
    }

    res.json({ success: true, redirectUrl, token });
});

// Protected routes (for demonstration purposes, these would serve the dashboards)
app.get('/admin-dashboard', verifyToken, (req, res) => {
    if (req.user.role !== 'admin') return res.sendStatus(403);
    res.send('Welcome to the Admin Dashboard');
});

app.get('/instructor-dashboard', verifyToken, (req, res) => {
    if (req.user.role !== 'instructor') return res.sendStatus(403);
    res.send('Welcome to the Instructor Dashboard');
});

app.get('/student-dashboard', verifyToken, (req, res) => {
    if (req.user.role !== 'student') return res.sendStatus(403);
    res.send('Welcome to the Student Dashboard');
});

// Middleware to verify the JWT token
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        jwt.verify(token, 'your_jwt_secret', (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                req.user = authData;
                next();
            }
        });
    } else {
        res.sendStatus(403);
    }
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
