import { connectToDatabase } from './mongodb';
import { ObjectId } from 'mongodb';

export async function createUser({ name, email, password }) {
  const { db } = await connectToDatabase();
  const users = { name, email, password, balance: 0 };
  const result = await db.collection('user').insertOne(users);
  return result.ops[0];
}

export async function getUserById(userId) {
  const { db } = await connectToDatabase();
  const user = await db.collection('user').findOne({ _id: ObjectId(userId) });
  return user;
}

export async function getAllUsers() {
  const { db } = await connectToDatabase();
  const users = await db.collection('user').find().toArray();
  return users.map(user => {
    return {
      ...user,
      _id: user._id.toString()
    };
  });
}


export async function loginUser(email, password) {
  const { db } = await connectToDatabase();
  const users = await db.collection('user').findOne({ email, password });
  return users;
}

export async function updateUserBalance(userId, amount) {
  const { db, client } = await connectToDatabase();
  const users = await db.collection('user').findOne({ _id: ObjectId(userId) });
  if (!users) {
    return { success: false, message: 'User not found' };
  }
  const newBalance = users.balance + amount;
  await client.db().collection('user').updateOne({ _id: ObjectId(userId) }, { $set: { balance: newBalance } });
  client.close();
  return { success: true };
}
