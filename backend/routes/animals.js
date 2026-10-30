const express = require('express');
const router = express.Router();
const { getAnimals, getAnimalById } = require('../controllers/animalController');

router.get('/', getAnimals);
router.get('/:id', getAnimalById);

module.exports = router;
