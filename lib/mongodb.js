import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

console.log("MONGDB_URL: " + process.env.MONGODB_URI)

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,


});

export async function connectToDatabase() {
  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DB);
    return { client, db };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to connect to database');
  }
}

export async function closeDatabaseConnection() {
  try {
    if (client.isConnected()) {
      await client.close();
    }
  } catch (error) {
    console.error(error);
    throw new Error('Failed to close database connection');
  }
}
