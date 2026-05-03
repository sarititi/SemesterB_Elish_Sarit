import express from 'express';
import usersRoutes from './routes/usersRoutes.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is running 🚀');
});

app.use('/users', usersRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
//לא באמת מוכן