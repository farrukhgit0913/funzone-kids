const express = require('express');
const router = express.Router();
const { saveScore, getLeaderboard, getStats } = require('../controllers/scoreController');

router.post('/', saveScore);
router.get('/leaderboard', getLeaderboard);
router.get('/stats', getStats);

module.exports = router;
