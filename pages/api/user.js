import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';
import { createUser, getAllUsers, loginUser, updateUserBalance } from '../../lib/dal';

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

export default async function handler(req, res) {
  await cors(req, res);

  if (req.method === 'POST') {
    try {
      const newUser = await createUser({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      res.status(200).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating user' });
    }
  } else if (req.method === 'GET') {
    try {
      const allUsers = await getAllUsers();
      res.status(200).json(allUsers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting users' });
    }
  } else if (req.method === 'PUT') {
    try {
      const updateResult = await updateUserBalance(req.body.userId, req.body.amount);
      if (updateResult.success) {
        res.status(200).json({ message: 'User balance updated successfully' });
      } else {
        res.status(404).json({ message: updateResult.message });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating user balance' });
    }
  } else if (req.method === 'DELETE') {
    res.status(405).json({ message: 'Method not allowed' });
  } else if (req.method === 'POST' && req.body.action === 'login') {
    try {
      const user = await loginUser(req.body.email, req.body.password);
      if (user) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error logging in' });
    }
  } else {
    res.status(400).json({ message: 'Bad request' });
  }
}
