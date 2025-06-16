import express from 'express';
import { createUser } from '../controllers/create.user.js';
import { loginUser } from '../controllers/login.user.js';
import User from '../models/user.model.js';

const router = express.Router();

// Example: GET /users
router.post('/create', createUser);

// Example: GET /users/:id
router.post('/login', loginUser);

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
});

router.post("/delete", async (req, res) => {
    const { email } = req.body;
    try {
        const deletedUser = await User.findOneAndDelete({ email: email });
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
});

router.get('/getUser/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
});


// Example: POST /users
export const userRouter = router;
