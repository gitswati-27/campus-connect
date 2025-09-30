const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const doubtRoutes = require('./routes/doubts');
const adminRoutes = require('./routes/admin');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/doubts', doubtRoutes);
app.use('/api/admin', adminRoutes);

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} at http://localhost:${PORT}`));
