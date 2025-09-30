const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('./models/user');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const users = [
    //{ name: 'Swati', regNo: 'CS2025001', password: '123456', role: 'student' },
    //{ name: 'Prof. Raj', regNo: 'FAC1001', password: 'abcdef', role: 'faculty' }
    {name:'System Admin', regNo: '001', password: 'admin123', role: 'admin'}
];


async function seed() {
    for (let u of users) {
        const salt = await bcrypt.genSalt(10);
        u.password = await bcrypt.hash(u.password, salt);
        await User.create(u);
    }
    console.log('Users seeded successfully');
    mongoose.disconnect();
}

seed();
