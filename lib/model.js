// SERVER SIDE UI

import mongoose from 'mongoose';

export let UserModel;

try {
  UserModel = mongoose.model('User');
} catch (error) {
  const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    balance: Number,
  });

  UserModel = mongoose.model('User', userSchema);
}

export default UserModel;
