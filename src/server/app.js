const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const eventsRouter = require('./routes/events');
const accountsRouter = require('./routes/accounts');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

app.use('/api/events', eventsRouter);
app.use('/api/accounts', accountsRouter);

const PORT = process.env.PORT || 3008;
app.listen(3049, () => console.log(`Server running on port ${3049}`));
