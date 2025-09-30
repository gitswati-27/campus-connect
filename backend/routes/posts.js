const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Post = require('../models/Post');

// Get all posts
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'name role regNo') // include author's details
            .sort({ date: -1 });

        res.json(posts);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Create a new post
router.post('/', auth, async (req, res) => {
    const { title, content, type } = req.body;

    try {
        const newPost = new Post({
            title,
            content,
            type,
            author: req.user.id   // comes from JWT
        });

        const post = await newPost.save();
        await post.populate('author', 'name role regNo'); // populate immediately

        res.json(post);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
