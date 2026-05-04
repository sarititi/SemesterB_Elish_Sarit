import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* אם נכנסים ל- / → הולכים ל-login */}
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;