import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function ManageQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const loadQuizzes = () => {
    setLoading(true);
    api.get('/quizzes/admin/all')
      .then((res) => setQuizzes(res.data.data))
      .catch((err) => setError(err.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

  const togglePublish = async (id) => {
    try {
      await api.put(`/quizzes/${id}/publish`);
      loadQuizzes();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  if (loading) return <p>Loading quizzes...</p>;

  return (
    <div>
      <h2>Manage Quizzes</h2>
      <p>
        <Link to="/quizzes">Back to quizzes</Link>
        {' | '}
        <Link to="/admin/create-quiz">+ Create a new quiz</Link>
      </p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {quizzes.length === 0 && <p>No quizzes yet.</p>}
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz._id} style={{ marginBottom: '1rem' }}>
            <h3>{quiz.title} {quiz.published ? '(Published)' : '(Draft)'}</h3>
            <p>{quiz.description}</p>
            <p>{quiz.questions.length} questions</p>
            <button onClick={() => togglePublish(quiz._id)}>
              {quiz.published ? 'Unpublish' : 'Publish'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
