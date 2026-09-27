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
      setSuccess('Quiz created! You can publish it from the list below or via the database.');
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
      <h2>Create Quiz</h2>
      <p><Link to="/quizzes">Back to quizzes</Link></p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Quiz title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {questions.map((q, qIndex) => (
          <div key={qIndex} style={{ border: '1px solid #555', padding: '1rem', margin: '1rem 0' }}>
            <p><strong>Question {qIndex + 1}</strong></p>
            <input
              placeholder="Question text"
              value={q.questionText}
              onChange={(e) => updateQuestion(qIndex, 'questionText', e.target.value)}
              required
              style={{ width: '100%' }}
            />
            {q.options.map((option, oIndex) => (
              <div key={oIndex} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0.25rem 0' }}>
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
                  style={{ flex: 1 }}
                />
                {q.options.length > 2 && (
                  <button type="button" onClick={() => removeOption(qIndex, oIndex)}>Remove</button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => addOption(qIndex)}>+ Add option</button>
            {questions.length > 1 && (
              <div>
                <button type="button" onClick={() => removeQuestion(qIndex)}>Remove question</button>
              </div>
            )}
          </div>
        ))}

        <button type="button" onClick={addQuestion}>+ Add question</button>
        <div style={{ marginTop: '1rem' }}>
          <button type="submit" disabled={submitting}>
            {submitting ? 'Creating...' : 'Create Quiz'}
          </button>
        </div>
      </form>
    </div>
  );
}
