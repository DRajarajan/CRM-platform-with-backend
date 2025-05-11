import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: String,
  totalSpend: {
    type: Number,
    default: 0,
  },
  visitCount: {
    type: Number,
    default: 0,
  },
  lastActivity: {
    type: Date,
    default: Date.now,
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Customer', customerSchema);