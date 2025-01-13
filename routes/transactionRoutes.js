const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

router.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/transactions/school/:school_id', async (req, res) => {
  try {
    const transactions = await Transaction.find({ school_id: req.params.school_id });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/transactions/status/:custom_order_id', async (req, res) => {
  try {
    const transaction = await Transaction.findOne({ custom_order_id: req.params.custom_order_id });
    if (transaction) {
      res.json({ status: transaction.status });
    } else {
      res.status(404).json({ message: 'Transaction not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/webhook', async (req, res) => {
  try {
      console.log('Webhook hit');
      console.log('Request body:', req.body);

      const { custom_order_id, status } = req.body;

      if (!custom_order_id || !status) {
          return res.status(400).json({ error: 'Invalid request body' });
      }

      const updatedTransaction = await Transaction.findOneAndUpdate(
          { custom_order_id },
          { status },
          { new: true }
      );

      if (!updatedTransaction) {
          console.log('Transaction not found for custom_order_id:', custom_order_id);
          return res.status(404).json({ error: 'Transaction not found' });
      }

      res.status(200).json({ message: 'Transaction updated successfully', updatedTransaction });
  } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/transactions/status/update', async (req, res) => {
  const { custom_order_id, status } = req.body;
  try {
    const transaction = await Transaction.findOneAndUpdate(
      { custom_order_id },
      { status },
      { new: true }
    );
    if (transaction) {
      res.status(200).json({ message: 'Transaction status updated successfully', transaction });
    } else {
      res.status(404).json({ message: 'Transaction not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
