import express from 'express';

const router = express.Router();

// POST /login route
router.post('/login', (req, res) => {
    // Handle login logic here
    res.send('Login route');
});

// POST /user route
router.post('/user', (req, res) => {
    // Handle user creation logic here
    res.send('User route');
});

export default router;