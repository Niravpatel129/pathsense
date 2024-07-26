const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const eventsRouter = require('./routes/events');
// const accountsRouter = require('./routes/accounts');

const app = express();

// Allow any URL to call this API
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
app.use(express.json());

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, '../../dist')));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

app.use('/api/events', eventsRouter);
// app.use('/api/accounts', accountsRouter);

// Catch-all route to serve the tracker
app.get('/tracker.min.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/tracker.min.js'));
});

const PORT = process.env.PORT || 3049;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
