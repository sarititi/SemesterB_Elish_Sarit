import { Link, Routes, Route, useNavigate } from 'react-router-dom';
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
            {/* תפריט עליון */}
            <div style={{ display: 'flex', gap: '10px' }}>
                <Link to="/app/info">Info</Link>
                <Link to="/app/todos">Todos</Link>
                <Link to="/app/posts">Posts</Link>
                <button onClick={logout}>Logout</button>
            </div>

            {/* עמודים פנימיים */}
            <Routes>
                <Route path="info" element={<Info user={user} />} />
                <Route path="todos" element={<div>Todos page</div>} />
                <Route path="posts" element={<div>Posts page</div>} />
            </Routes>
        </div>
    );
}

function Info({ user }) {
    return (
        <div className="card">
            <h2>User Info</h2>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
        </div>
    );
}

export default MainApp;