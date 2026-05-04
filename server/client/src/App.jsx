import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import MainApp from './pages/MainApp.jsx';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/app/*" element={<MainApp />} />

      {/* אם נכנסים ל- / → הולכים ל-login */}
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;