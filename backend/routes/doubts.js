const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Doubt = require('../models/doubt');

// Student: Ask a new doubt
router.post('/', auth, async (req, res) => {
  try {
    const newDoubt = new Doubt({
      question: req.body.question,
      student: req.user.id
    });
    const doubt = await newDoubt.save();
    res.json(doubt);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Faculty: Get doubts
router.get('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'faculty') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    const doubts = await Doubt.find({ assignedFaculty: req.user.id })
      .populate('student', 'name regNo')
      .populate('faculty', 'name')
      .populate('assignedFaculty', 'name');

    res.json(doubts);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});


// Faculty: Answer a doubt
router.put('/:id', auth, async (req, res) => {
  try {
    const doubt = await Doubt.findById(req.params.id);
    if (!doubt) return res.status(404).json({ msg: 'Doubt not found' });

    doubt.answer = req.body.answer;
    doubt.faculty = req.user.id;
    await doubt.save();

    res.json(doubt);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
