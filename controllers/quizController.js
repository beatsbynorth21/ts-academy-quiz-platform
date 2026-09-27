const Quiz = require('../models/Quiz');
const Attempt = require('../models/Attempt');

// Create a new quiz (admin only)
const createQuiz = async (req, res) => {
  try {
    const { title, description, questions } = req.body;

    const quiz = await Quiz.create({
      title,
      description,
      questions,
      createdBy: req.user._id
    });

    res.status(201).json({ success: true, data: quiz });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all published quizzes (for users to browse)
// Get ALL quizzes, published or not (admin only)
const getAllQuizzesAdmin = async (req, res) => {
  try {
    const quizzes = await Quiz.find({});
    res.json({ success: true, data: quizzes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ published: true }).select('-questions.correctAnswer');
    res.json({ success: true, data: quizzes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get a single quiz by ID (without correct answers, for taking the quiz)
const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).select('-questions.correctAnswer');
    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }
    res.json({ success: true, data: quiz });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Publish/unpublish a quiz (admin only)
const togglePublish = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }
    quiz.published = !quiz.published;
    await quiz.save();
    res.json({ success: true, data: quiz });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Submit a quiz attempt
const submitAttempt = async (req, res) => {
  try {
    const { answers } = req.body;
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }

    let score = 0;
    quiz.questions.forEach((q, index) => {
      const userAnswer = answers.find(a => a.questionIndex === index);
      if (userAnswer && String(userAnswer.selectedAnswer) === String(q.correctAnswer)) {
        score++;
      }
    });

    const attempt = await Attempt.create({
      user: req.user._id,
      quiz: quiz._id,
      answers,
      score,
      totalQuestions: quiz.questions.length
    });

    res.status(201).json({ success: true, data: attempt });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get logged-in user's past attempts
const getMyAttempts = async (req, res) => {
  try {
    const attempts = await Attempt.find({ user: req.user._id }).populate('quiz', 'title');
    res.json({ success: true, data: attempts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createQuiz,
  getAllQuizzesAdmin,
  getQuizzes,
  getQuizById,
  togglePublish,
  submitAttempt,
  getMyAttempts
};