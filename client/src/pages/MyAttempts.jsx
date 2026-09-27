import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function MyAttempts() {
  const [attempts, setAttempts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/quizzes/my-attempts')
      .then((res) => setAttempts(res.data.data))
      .catch((err) => setError(err.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="dim-text">Loading your attempts...</p>;

  return (
    <div>
      <div className="page-header">
        <h2>My Attempts</h2>
      </div>
      <p><Link to="/quizzes">← Back to quizzes</Link></p>
      {error && <p className="error-text">{error}</p>}
      {attempts.length === 0 && !error && (
        <p className="dim-text">You haven't taken any quizzes yet.</p>
      )}
      {attempts.map((attempt) => {
        const pct = Math.round((attempt.score / attempt.totalQuestions) * 100);
        return (
          <div className="card" key={attempt._id}>
            <div className="page-header" style={{ marginBottom: '0.5rem' }}>
              <h3 style={{ margin: 0 }}>{attempt.quiz?.title || 'Deleted quiz'}</h3>
              <span className={`badge ${pct >= 50 ? 'published' : 'draft'}`}>
                {attempt.score}/{attempt.totalQuestions} ({pct}%)
              </span>
            </div>
            <p className="dim-text">
              {new Date(attempt.createdAt).toLocaleString()}
            </p>
          </div>
        );
      })}
    </div>
  );
}
