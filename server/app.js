import express from 'express';
import cors from 'cors';

import usersRoutes from './routes/usersRoutes.js';
import todosRoutes from './routes/todosRoutes.js';
import postsRoutes from './routes/postsRoutes.js';
import commentsRoutes from './routes/commentsRoutes.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:5174',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));

app.options('/{*path}', cors());

app.use(express.json());

app.use((req, res, next) => {
    console.log('REQ:', req.method, req.url);
    next();
});

app.use('/users', usersRoutes);
app.use('/todos', todosRoutes);
app.use('/posts', postsRoutes);
app.use('/comments', commentsRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});