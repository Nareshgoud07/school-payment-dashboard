
const express = require('express');
const mongoose = require('mongoose');
const authenticate = require('./authenticate'); 
const User = require('./models/user'); 
const app = express();
const transactionRoutes = require('./routes/transactionRoutes');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

app.use(express.json()); 
app.use('/api', transactionRoutes);

const MONGO_URI = 'mongodb+srv://Naresh_goud:naresh2002@cluster0.7tg46.mongodb.net/school-dashboard?retryWrites=true&w=majority';
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));


app.get('/api/transactions', authenticate, (req, res) => {
  res.json({ message: 'Transactions data' });
});

app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user._id, username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });
  
  res.json({ token });
});

app.post('/api/webhook', (req, res) => {
  try {
      const { custom_order_id, status } = req.body;
      console.log('Custom Order ID:', custom_order_id);
      console.log('Status:', status);

      res.status(200).json({ message: 'Transaction processed successfully' });
  } catch (error) {
      console.error('Error in processing request body:', error.message);
      res.status(400).json({ message: 'Invalid request body' });
  }
});




// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server running on port 5000');
});
