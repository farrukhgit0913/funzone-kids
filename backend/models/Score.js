const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  playerName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 30
  },
  gameType: {
    type: String,
    required: true,
    enum: ['animal-matching', 'shape-puzzle']
  },
  score: {
    type: Number,
    required: true,
    min: 0
  },
  level: {
    type: Number,
    default: 1
  },
  timeTaken: {
    type: Number, // seconds
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Score', scoreSchema);
