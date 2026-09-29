import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/register', { name, email, password });
      login(res.data.data);
      navigate('/quizzes');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-page"><div className="card auth-card">
      <h1 style={{textAlign:"center",marginBottom:"0.25rem"}}>BrainRush</h1><p className="dim-text" style={{textAlign:"center",marginBottom:"1.5rem"}}>Sharpen your mind. One quiz at a time.</p><h2>Register</h2>
      {error && <p className="error-text">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={name}
          onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
      <p className="dim-text">Have an account? <Link to="/login">Login</Link></p>
    </div></div>
  );
}
