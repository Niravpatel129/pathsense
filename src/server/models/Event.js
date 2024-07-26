const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  // accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  type: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  data: { type: mongoose.Schema.Types.Mixed },
});

module.exports = mongoose.model('Event', eventSchema);
