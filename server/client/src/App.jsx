import { Routes, Route, Navigate, Link, useNavigate, useParams } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Todos from './pages/Todos.jsx';
import Posts from './pages/Posts.jsx';
import './App.css';

function ProtectedRoute({ children }) {
  const user = localStorage.getItem('user');
  if (!user) return <Navigate to="/login" />;
  return children;
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

function MainLayout() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <Link to={`/users/${userId}/info`}>Info</Link>
        <Link to={`/users/${userId}/todos`}>Todos</Link>
        <Link to={`/users/${userId}/posts`}>Posts</Link>
        <button onClick={logout}>Logout</button>
      </nav>
      <div className="content">
        <Routes>
          <Route path="info"  element={<Info user={user} />} />
          <Route path="todos" element={<Todos user={user} />} />
          <Route path="posts" element={<Posts user={user} />} />
          <Route path="*"     element={<Navigate to="info" />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/users/:userId/*" element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      } />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;