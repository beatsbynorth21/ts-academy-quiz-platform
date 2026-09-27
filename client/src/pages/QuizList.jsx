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

  if (loading) return <p>Loading quizzes...</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Quizzes</h2>
        <button onClick={logout}>Logout ({user?.name})</button>
      </div>
      {user?.role === 'admin' && (
        <p><Link to="/admin/manage-quizzes">Manage quizzes (admin)</Link></p>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {quizzes.length === 0 && !error && <p>No quizzes available yet.</p>}
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz._id} style={{ marginBottom: '1rem' }}>
            <h3>{quiz.title}</h3>
            <p>{quiz.description}</p>
            <p>{quiz.questions.length} questions</p>
            <Link to={`/quizzes/${quiz._id}`}>Take Quiz</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
