const express = require('express');
const router = express.Router();
const {
  getAllQuizzesAdmin,
  createQuiz,
  getQuizzes,
  getQuizById,
  togglePublish,
  submitAttempt,
  getMyAttempts
} = require('../controllers/quizController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', getQuizzes);
router.get('/admin/all', protect, admin, getAllQuizzesAdmin);
router.get('/my-attempts', protect, getMyAttempts);
router.get('/:id', getQuizById);
router.post('/', protect, admin, createQuiz);
router.put('/:id/publish', protect, admin, togglePublish);
router.post('/:id/attempt', protect, submitAttempt);

module.exports = router;
