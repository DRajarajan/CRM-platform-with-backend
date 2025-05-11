import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['draft', 'sending', 'completed', 'failed'],
    default: 'draft',
  },
  segment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Segment',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  audienceSize: {
    type: Number,
    required: true,
  },
  deliveredCount: {
    type: Number,
    default: 0,
  },
  failedCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: Date,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default mongoose.model('Campaign', campaignSchema);