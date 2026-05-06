// import { useState } from 'react';
// import { useNavigate, Navigate } from 'react-router-dom';
// import './Login.css';

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const navigate = useNavigate();

//   // אם כבר מחובר — אל תיתן לחזור ל-Login
//   const user = localStorage.getItem('user');
//   if (user) {
//     return <Navigate to="/app/info" />;
//   }

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch('http://localhost:3000/users/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password })
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message);
//         return;
//       }

//       // ✔️ שמירה ב-LocalStorage
//       localStorage.setItem('user', JSON.stringify(data.user));

//       // ✔️ מעבר לעמוד הראשי
//       navigate('/app');

//     } catch (err) {
//       setError('Server error');
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2>Login</h2>

//         <form onSubmit={handleLogin}>
//           <input
//             placeholder="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />

//           <input
//             type="password"
//             placeholder="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <button>Login</button>

//           {error && <p className="error">{error}</p>}
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // אם כבר מחובר — אל תיתן לחזור ל-Login
  const user = localStorage.getItem('user');
  if (user) {
    return <Navigate to="/app/info" />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      // ✔️ שמירה ב-LocalStorage
      localStorage.setItem('user', JSON.stringify(data.user));

      // ✔️ מעבר לעמוד הראשי
      navigate('/app');

    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button>Login</button>

          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;