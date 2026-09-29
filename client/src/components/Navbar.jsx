import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/quizzes" className="nav-brand">BrainRush</Link>
      <div className="nav-links">
        <Link to="/quizzes">Quizzes</Link>
        <Link to="/my-attempts">My Attempts</Link>
        {user.role === 'admin' && (
          <>
            <Link to="/admin/create-quiz">Create</Link>
            <Link to="/admin/manage-quizzes">Manage</Link>
          </>
        )}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
