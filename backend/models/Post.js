const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'   // link to User collection
    },
    date: { type: Date, default: Date.now },
    type: { type: String, enum: ['notification', 'discussion'], default: 'discussion' }
});

module.exports = mongoose.model('Post', postSchema);
