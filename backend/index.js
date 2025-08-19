const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/leaderboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
const userRoutes = require('./routes/users');
const pointsRoutes = require('./routes/points');

app.use('/api/users', userRoutes);
app.use('/api/points', pointsRoutes);

const PORT = process.env.PORT || 5000;
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Vercel backend!" });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
