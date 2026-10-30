const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  emoji: { type: String, required: true },
  sound: { type: String, required: true },
  soundEmoji: { type: String, required: true },
  difficulty: { type: Number, default: 1 } // 1=easy, 2=medium, 3=hard
});

module.exports = mongoose.model('Animal', animalSchema);
