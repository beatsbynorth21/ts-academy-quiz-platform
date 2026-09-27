import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import QuizList from './pages/QuizList';
import TakeQuiz from './pages/TakeQuiz';
import Results from './pages/Results';
import CreateQuiz from './pages/CreateQuiz';
import ManageQuizzes from './pages/ManageQuizzes';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/quizzes" element={
            <PrivateRoute><QuizList /></PrivateRoute>
          } />
          <Route path="/quizzes/:id" element={
            <PrivateRoute><TakeQuiz /></PrivateRoute>
          } />
          <Route path="/results" element={
            <PrivateRoute><Results /></PrivateRoute>
          } />
          <Route path="/admin/create-quiz" element={
            <AdminRoute><CreateQuiz /></AdminRoute>
          } />
          <Route path="/admin/manage-quizzes" element={
            <AdminRoute><ManageQuizzes /></AdminRoute>
          } />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
