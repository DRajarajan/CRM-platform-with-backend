import mongoose from 'mongoose';

const ruleSchema = new mongoose.Schema({
  field: {
    type: String,
    required: true,
  },
  operator: {
    type: String,
    required: true,
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  conjunction: {
    type: String,
    enum: ['AND', 'OR'],
  },
});

const segmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rules: [ruleSchema],
  audienceSize: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default mongoose.model('Segment', segmentSchema);