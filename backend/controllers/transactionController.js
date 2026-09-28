// backend/controllers/transactionController.js
// CRUD অপারেশনস ও Calculations হ্যান্ডেল করার কন্ট্রোলার

const Transaction = require('../models/Transaction');

// @desc    Get all transactions & summary stats
// @route   GET /api/transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });

    // Total Income, Expense, Balance হিসাব করা
    const totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((acc, item) => acc + item.amount, 0);

    const totalExpense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, item) => acc + item.amount, 0);

    const balance = totalIncome - totalExpense;

    res.status(200).json({
      success: true,
      summary: {
        totalIncome,
        totalExpense,
        balance,
      },
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new transaction
// @route   POST /api/transactions
exports.addTransaction = async (req, res) => {
  try {
    const { title, amount, type, category, date } = req.body;

    const transaction = await Transaction.create({
      title,
      amount,
      type,
      category,
      date: date || Date.now(),
    });

    res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }

    await transaction.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Transaction deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};