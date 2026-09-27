import { useLocation, Link } from 'react-router-dom';

export default function Results() {
  const location = useLocation();
  const result = location.state?.result;

  if (!result) {
    return (
      <div>
        <p>No results to show.</p>
        <Link to="/quizzes">Back to quizzes</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Results</h2>
      <p>You scored {result.score} out of {result.totalQuestions}</p>
      <Link to="/quizzes">Back to quizzes</Link>
    </div>
  );
}
