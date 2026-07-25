import mongoose from 'mongoose';
import { env } from './env';

let isConnected = false;

export const connectDB = async (retries = 10): Promise<void> => {
  if (isConnected || mongoose.connection.readyState === 1) {
    isConnected = true;
    return;
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`[connectDB] Attempting MongoDB Atlas connection (${attempt}/${retries})...`);
      const conn = await mongoose.connect(env.MONGODB_URI, {
        dbName: 'algovisualizer',
        serverSelectionTimeoutMS: 20000,
        connectTimeoutMS: 20000,
      });

      isConnected = true;
      console.log(`✅  MongoDB connected to Atlas: ${conn.connection.host}`);

      // Auto-seed database asynchronously in background
      import('../utils/seeder')
        .then(({ seedDatabase }) => seedDatabase())
        .catch((err) => console.error('Seeder background error:', err));
      return;
    } catch (error) {
      console.error(`❌ MongoDB Atlas Connection Error (Attempt ${attempt}/${retries}):`, error);
      if (attempt < retries) {
        await new Promise((res) => setTimeout(res, 3000));
      } else {
        throw new Error(`Failed to connect to MongoDB Atlas after ${retries} attempts: ${error}`);
      }
    }
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB disconnected! Retrying connection...');
  isConnected = false;
  connectDB().catch((err) => console.error('Auto-reconnect error:', err));
});

export const disconnectDB = async (): Promise<void> => {
  if (!isConnected) return;
  await mongoose.connection.close();
  isConnected = false;
  console.log('MongoDB disconnected.');
};
