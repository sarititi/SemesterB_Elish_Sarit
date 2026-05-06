import { Link, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Todos from './Todos.jsx';
import Posts from './Posts.jsx';
import './MainApp.css';

function MainApp() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const logout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="app-container">
            {/* נאבבר עליון */}
            <nav className="navbar">
                <Link to="/app/info">Info</Link>
                <Link to="/app/todos">Todos</Link>
                <Link to="/app/posts">Posts</Link>
                <button onClick={logout}>Logout</button>
            </nav>

            {/* עמודים פנימיים */}
            <div className="content">
                <Routes>
                    <Route path="info" element={<Info user={user} />} />
                    <Route path="todos" element={<Todos user={user} />} />
                    <Route path="posts" element={<Posts user={user} />} />
                    <Route path="*" element={<Navigate to="info" />} />
                </Routes>
            </div>
        </div>
    );
}

function Info({ user }) {
    return (
        <div className="card">
            <h2>User Info</h2>
            <p><strong>Username:</strong> {user.username}</p>
            <p style={{ marginTop: '8px' }}><strong>Email:</strong> {user.email}</p>
            <p style={{ marginTop: '8px' }}><strong>ID:</strong> {user.id}</p>
        </div>
    );
}

export default MainApp;
