const mongoose = require('mongoose');

const habitSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  weeks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'week' }],
  color: {
    type: String,
    enum: ["#93C5FD", "#FCA5A5", "#FCD34D", "#D8B4FE", "#86EFAC"],
    default: '#93C5FD'
  },
  type: {
    type: String,
    enum: ['do', 'avoid'],
    default: 'do'
  },
});

module.exports = mongoose.model('habit', habitSchema);
