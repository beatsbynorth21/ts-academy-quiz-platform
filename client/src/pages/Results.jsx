import { useLocation, Link } from 'react-router-dom';

export default function Results() {
  const location = useLocation();
  const result = location.state?.result;

  if (!result) {
    return (
      <div className="card">
        <p className="dim-text">No results to show.</p>
        <Link to="/quizzes">Back to quizzes</Link>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Results</h2>
      <p style={{ fontSize: '1.3rem' }}>
        You scored <strong>{result.score}</strong> out of <strong>{result.totalQuestions}</strong>
      </p>
      <Link to="/quizzes">Back to quizzes</Link>
    </div>
  );
}
