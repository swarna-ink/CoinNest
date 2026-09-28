// backend/models/Transaction.js
// Transaction Schema (Income / Expense)

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title/description'],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, 'Please add an amount'],
    },
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: [true, 'Type must be income or expense'],
    },
    category: {
      type: String,
      required: [true, 'Please specify a category'],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // CreatedAt and UpdatedAt Auto Tracking
  }
);

module.exports = mongoose.model('Transaction', transactionSchema);