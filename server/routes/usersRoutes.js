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
    const users = await getAllUsers();
    res.json(users);
});


// GET user by id
router.get('/:id', async (req, res) => {
    const user = await getUserById(req.params.id);
    res.json(user);
});


// LOGIN check (דוגמה בסיסית)
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await getUserByUsername(username);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const dbPassword = await getPasswordByUserId(user.id);

    if (!dbPassword || dbPassword.password !== password) {
        return res.status(401).json({ message: 'Wrong password' });
    }

    res.json({ message: 'Login success', user });
});


// CREATE user
router.post('/', async (req, res) => {
    const { username, email } = req.body;

    const result = await createUser(username, email);
    res.json(result);
});


// UPDATE user
router.put('/:id', async (req, res) => {
    const { username, email } = req.body;

    const result = await updateUser(req.params.id, username, email);
    res.json(result);
});


// DELETE user
router.delete('/:id', async (req, res) => {
    const result = await deleteUser(req.params.id);
    res.json(result);
});

export default router;