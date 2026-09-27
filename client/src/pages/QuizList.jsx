import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();

  useEffect(() => {
    api.get('/quizzes')
      .then((res) => setQuizzes(res.data.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="dim-text">Loading quizzes...</p>;

  return (
    <div>
      <div className="page-header">
        <h2>Quizzes</h2>
        <button className="secondary" onClick={logout}>Logout ({user?.name})</button>
      </div>
      <div className="nav-links">
        <Link to="/my-attempts">My Attempts</Link>
        {user?.role === 'admin' && (
          <Link to="/admin/manage-quizzes">Manage quizzes (admin)</Link>
        )}
      </div>
      {error && <p className="error-text">{error}</p>}
      {quizzes.length === 0 && !error && <p className="dim-text">No quizzes available yet.</p>}
      {quizzes.map((quiz) => (
        <div className="card" key={quiz._id}>
          <h3>{quiz.title}</h3>
          <p className="dim-text">{quiz.description}</p>
          <p className="dim-text">{quiz.questions.length} questions</p>
          <Link to={`/quizzes/${quiz._id}`}>Take Quiz →</Link>
        </div>
      ))}
    </div>
  );
}
