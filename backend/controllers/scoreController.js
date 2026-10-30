const Score = require('../models/Score');

exports.saveScore = async (req, res) => {
  try {
    const { playerName, gameType, score, level, timeTaken } = req.body;
    const newScore = new Score({ playerName, gameType, score, level, timeTaken });
    await newScore.save();
    res.status(201).json({ success: true, data: newScore, message: 'Score saved!' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getLeaderboard = async (req, res) => {
  try {
    const { gameType, limit = 10 } = req.query;
    const filter = gameType ? { gameType } : {};
    const scores = await Score.find(filter)
      .sort({ score: -1, timeTaken: 1 })
      .limit(parseInt(limit));
    res.json({ success: true, data: scores });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const animalTotal = await Score.countDocuments({ gameType: 'animal-matching' });
    const shapeTotal = await Score.countDocuments({ gameType: 'shape-puzzle' });
    const animalTop = await Score.findOne({ gameType: 'animal-matching' }).sort({ score: -1 });
    const shapeTop = await Score.findOne({ gameType: 'shape-puzzle' }).sort({ score: -1 });
    res.json({
      success: true,
      data: {
        animalMatching: { totalGames: animalTotal, topScore: animalTop },
        shapePuzzle: { totalGames: shapeTotal, topScore: shapeTop }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
