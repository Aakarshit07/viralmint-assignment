const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.js');
const blogRoutes = require('./routes/blog.js');

dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('DB Connection Error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

// Fallback Route for 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
