const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Transaction = require('../models/Transaction.js'); 

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

const seedTransactions = async () => {
  try {
    const transactions = [
      { collect_id: '009', school_id: 'S009', gateway: 'PhonePe', order_amount: 1200, transaction_amount: 1200, status: 'failed', custom_order_id: 'ORD131' },
      { collect_id: '010', school_id: 'S010', gateway: 'Gpay', order_amount: 29000, transaction_amount: 29000, status: 'pending', custom_order_id: 'ORD132' },
      { collect_id: '011', school_id: 'S011', gateway: 'Stripe', order_amount: 4000, transaction_amount: 4000, status: 'completed', custom_order_id: 'ORD133' },
      { collect_id: '012', school_id: 'S012', gateway: 'Amazon Pay', order_amount: 2700, transaction_amount: 2700, status: 'failed', custom_order_id: 'ORD134' },
      { collect_id: '013', school_id: 'S013', gateway: 'Paytm', order_amount: 2580, transaction_amount: 2580, status: 'completed', custom_order_id: 'ORD135' },
      { collect_id: '014', school_id: 'S014', gateway: 'PayPal', order_amount: 8500, transaction_amount: 8500, status: 'pending', custom_order_id: 'ORD136' },
    ];

    await Transaction.insertMany(transactions);
    console.log('Transactions seeded successfully!');
  } catch (err) {
    console.error('Error seeding transactions:', err);
  } finally {
    mongoose.connection.close();
  }
};

seedTransactions();
