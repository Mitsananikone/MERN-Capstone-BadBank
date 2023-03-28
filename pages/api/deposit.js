import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';
import { updateUserBalance } from '../../lib/dal';
import { connectToDatabase } from '../../lib/mongodb';

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'], // Allowed methods
  })
);

export default async function handler(req, res) {
  await cors(req, res);
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const { client, db } = await connectToDatabase();
  console.log("DB: " + JSON.stringify(db[0]));

  try {
    const { userId, amount } = req.body;
  
    if (isNaN(amount)) {
      res.status(400).json({ message: 'Please enter a valid number' });
      return;
    }
  
    if (parseFloat(amount) <= 0) {
      res.status(400).json({ message: 'Please enter a positive number' });
      return;
    }
  
    const result = await updateUserBalance(userId, amount);
  
    if (!result.success) {
      res.status(400).json({ message: result.message });
      return;
    }
  
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).json({ message: 'Deposit successful' });
  } catch (error) {
    console.error('Error depositing funds:', error);
    res.status(500).json({ message: 'Error depositing funds', error: error.message });
  }
  
}
