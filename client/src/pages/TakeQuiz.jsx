import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

export default function TakeQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get(`/quizzes/${id}`)
      .then((res) => setQuiz(res.data.data))
      .catch((err) => setError(err.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSelect = (questionIndex, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const formattedAnswers = Object.entries(answers).map(([questionIndex, selectedAnswer]) => ({
        questionIndex: Number(questionIndex),
        selectedAnswer
      }));
      const res = await api.post(`/quizzes/${id}/attempt`, { answers: formattedAnswers });
      navigate('/results', { state: { result: res.data.data } });
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading quiz...</p>;
  if (error && !quiz) return <p style={{ color: 'red' }}>{error}</p>;
  if (!quiz) return null;

  return (
    <div>
      <h2>{quiz.title}</h2>
      <p>{quiz.description}</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {quiz.questions.map((q, qIndex) => (
          <div key={qIndex} style={{ marginBottom: '1.5rem' }}>
            <p><strong>{qIndex + 1}. {q.questionText}</strong></p>
            {q.options.map((option, oIndex) => (
              <label key={oIndex} style={{ display: 'block' }}>
                <input
                  type="radio"
                  name={`question-${qIndex}`}
                  checked={answers[qIndex] === oIndex}
                  onChange={() => handleSelect(qIndex, oIndex)}
                  required
                />
                {' '}{option}
              </label>
            ))}
          </div>
        ))}
        <button type="submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Quiz'}
        </button>
      </form>
    </div>
  );
}
