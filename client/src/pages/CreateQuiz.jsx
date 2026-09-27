import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

const emptyQuestion = () => ({ questionText: '', options: ['', ''], correctAnswer: 0 });

export default function CreateQuiz() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([emptyQuestion()]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const updateQuestion = (qIndex, field, value) => {
    setQuestions((prev) => {
      const next = [...prev];
      next[qIndex] = { ...next[qIndex], [field]: value };
      return next;
    });
  };

  const updateOption = (qIndex, oIndex, value) => {
    setQuestions((prev) => {
      const next = [...prev];
      const options = [...next[qIndex].options];
      options[oIndex] = value;
      next[qIndex] = { ...next[qIndex], options };
      return next;
    });
  };

  const addOption = (qIndex) => {
    setQuestions((prev) => {
      const next = [...prev];
      next[qIndex] = { ...next[qIndex], options: [...next[qIndex].options, ''] };
      return next;
    });
  };

  const removeOption = (qIndex, oIndex) => {
    setQuestions((prev) => {
      const next = [...prev];
      const options = next[qIndex].options.filter((_, i) => i !== oIndex);
      let correctAnswer = next[qIndex].correctAnswer;
      if (correctAnswer >= options.length) correctAnswer = 0;
      next[qIndex] = { ...next[qIndex], options, correctAnswer };
      return next;
    });
  };

  const addQuestion = () => setQuestions((prev) => [...prev, emptyQuestion()]);

  const removeQuestion = (qIndex) => {
    setQuestions((prev) => prev.filter((_, i) => i !== qIndex));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);
    try {
      await api.post('/quizzes', { title, description, questions });
      setSuccess('Quiz created! Publish it from Manage Quizzes.');
      setTitle('');
      setDescription('');
      setQuestions([emptyQuestion()]);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h2>Create Quiz</h2>
      </div>
      <p><Link to="/admin/manage-quizzes">← Back to manage quizzes</Link></p>
      {error && <p className="error-text">{error}</p>}
      {success && <p className="success-text">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="card">
          <input
            placeholder="Quiz title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>

        {questions.map((q, qIndex) => (
          <div className="card" key={qIndex}>
            <p className="dim-text"><strong>Question {qIndex + 1}</strong></p>
            <input
              placeholder="Question text"
              value={q.questionText}
              onChange={(e) => updateQuestion(qIndex, 'questionText', e.target.value)}
              required
            />
            {q.options.map((option, oIndex) => (
              <div className="option-row" key={oIndex}>
                <input
                  type="radio"
                  name={`correct-${qIndex}`}
                  checked={q.correctAnswer === oIndex}
                  onChange={() => updateQuestion(qIndex, 'correctAnswer', oIndex)}
                />
                <input
                  placeholder={`Option ${oIndex + 1}`}
                  value={option}
                  onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                  required
                  style={{ flex: 1, margin: 0 }}
                />
                {q.options.length > 2 && (
                  <button type="button" className="secondary" onClick={() => removeOption(qIndex, oIndex)}>×</button>
                )}
              </div>
            ))}
            <button type="button" className="secondary" onClick={() => addOption(qIndex)}>+ Add option</button>
            {questions.length > 1 && (
              <div style={{ marginTop: '0.5rem' }}>
                <button type="button" className="danger" onClick={() => removeQuestion(qIndex)}>Remove question</button>
              </div>
            )}
          </div>
        ))}

        <div className="nav-links">
          <button type="button" className="secondary" onClick={addQuestion}>+ Add question</button>
          <button type="submit" disabled={submitting}>
            {submitting ? 'Creating...' : 'Create Quiz'}
          </button>
        </div>
      </form>
    </div>
  );
}
