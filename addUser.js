
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user'); 

const MONGO_URI = 'mongodb+srv://Naresh_goud:<your_password>@cluster0.7tg46.mongodb.net/school-dashboard?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const username = 'admin';  
    const password = 'newPassword123'; 

    const userExists = await User.findOne({ username });
    if (userExists) {
      console.log('User already exists');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username: username,
        password: hashedPassword,
      });

      await newUser.save();
      console.log('User created successfully!');
    }
    mongoose.connection.close(); 
  })
  .catch((err) => {
    console.error('Error:', err);
    mongoose.connection.close(); 
  });
