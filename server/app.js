import express from 'express';
import usersRoutes from './routes/usersRoutes.js';
import todosRoutes from './routes/todosRoutes.js';
import postsRoutes from './routes/postsRoutes.js';
import commentsRoutes from './routes/commentsRoutes.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is running 🚀');
});

app.use('/users', usersRoutes);
app.use('/todos', todosRoutes);
app.use('/posts', postsRoutes);
app.use('/comments', commentsRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
//לא באמת מוכן