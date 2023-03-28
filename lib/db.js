import { connectToDatabase } from './mongodb';

export async function getDatabase() {
  const { db } = await connectToDatabase();
  return { db };
}
