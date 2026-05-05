import express from 'express';
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserByUsername,
    getPasswordByUserId
} from '../models/usersModel.js';

const router = express.Router();


// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
});


// GET user by id
router.get('/:id', async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
});


// LOGIN
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const user = await getUserByUsername(username);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const dbPassword = await getPasswordByUserId(user.id);
        if (!dbPassword || dbPassword.password !== password) {
            return res.status(401).json({ message: 'Wrong password' });
        }

        res.json({ message: 'Login success', user });

    } catch (err) {
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
});


// CREATE user
router.post('/', async (req, res) => {
    try {
        const { username, email } = req.body;

        if (!username || !email) {
            return res.status(400).json({ message: 'Username and email are required' });
        }

        const result = await createUser(username, email);
        res.status(201).json(result);

    } catch (err) {
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
});


// UPDATE user
router.put('/:id', async (req, res) => {
    try {
        const { username, email } = req.body;

        if (!username || !email) {
            return res.status(400).json({ message: 'Username and email are required' });
        }

        const result = await updateUser(req.params.id, username, email);
        res.json(result);

    } catch (err) {
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
});


// DELETE user
router.delete('/:id', async (req, res) => {
    try {
        const result = await deleteUser(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
});


export default router;