const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  answers: [
    {
      questionIndex: Number,
      selectedAnswer: String
    }
  ],
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Attempt', attemptSchema);