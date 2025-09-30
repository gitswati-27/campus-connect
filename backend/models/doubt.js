const mongoose = require('mongoose');

const doubtSchema = new mongoose.Schema({
  question: { type: String, required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // who asked
  answer: { type: String, default: null },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // who answered
  assignedFaculty: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Doubt', doubtSchema);
