const Animal = require('../models/Animal');

// Seed data
const defaultAnimals = [
  { name: 'Dog', emoji: '🐶', sound: 'Woof!', soundEmoji: '🔊', difficulty: 1 },
  { name: 'Cat', emoji: '🐱', sound: 'Meow!', soundEmoji: '🔊', difficulty: 1 },
  { name: 'Cow', emoji: '🐮', sound: 'Moo!', soundEmoji: '🔊', difficulty: 1 },
  { name: 'Duck', emoji: '🦆', sound: 'Quack!', soundEmoji: '🔊', difficulty: 1 },
  { name: 'Pig', emoji: '🐷', sound: 'Oink!', soundEmoji: '🔊', difficulty: 1 },
  { name: 'Sheep', emoji: '🐑', sound: 'Baa!', soundEmoji: '🔊', difficulty: 2 },
  { name: 'Horse', emoji: '🐴', sound: 'Neigh!', soundEmoji: '🔊', difficulty: 2 },
  { name: 'Frog', emoji: '🐸', sound: 'Ribbit!', soundEmoji: '🔊', difficulty: 2 },
  { name: 'Lion', emoji: '🦁', sound: 'Roar!', soundEmoji: '🔊', difficulty: 2 },
  { name: 'Elephant', emoji: '🐘', sound: 'Trumpet!', soundEmoji: '🔊', difficulty: 3 },
  { name: 'Monkey', emoji: '🐒', sound: 'Ooh Ooh!', soundEmoji: '🔊', difficulty: 3 },
  { name: 'Snake', emoji: '🐍', sound: 'Hiss!', soundEmoji: '🔊', difficulty: 3 },
];

exports.seedAnimals = async () => {
  const count = await Animal.countDocuments();
  if (count === 0) {
    await Animal.insertMany(defaultAnimals);
    console.log('Animals seeded successfully');
  }
};

exports.getAnimals = async (req, res) => {
  try {
    const { difficulty } = req.query;
    const filter = difficulty ? { difficulty: parseInt(difficulty) } : {};
    const animals = await Animal.find(filter);
    res.json({ success: true, data: animals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAnimalById = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) return res.status(404).json({ success: false, message: 'Animal not found' });
    res.json({ success: true, data: animal });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
