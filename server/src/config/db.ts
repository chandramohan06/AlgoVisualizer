import mongoose from 'mongoose';
import { env } from './env';

let isConnected = false;

export const connectDB = async (retries = 5): Promise<void> => {
  if (isConnected || mongoose.connection.readyState === 1) {
    isConnected = true;
    return;
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const conn = await mongoose.connect(env.MONGODB_URI, {
        dbName: 'algovisualizer',
        serverSelectionTimeoutMS: 10000,
      });

      isConnected = true;
      console.log(`✅  MongoDB connected to Atlas: ${conn.connection.host}`);

      // Auto-seed database asynchronously in background so HTTP startup is instantaneous
      import('../utils/seeder')
        .then(({ seedDatabase }) => seedDatabase())
        .catch((err) => console.error('Seeder background error:', err));
      return;
    } catch (error) {
      console.error(`❌ MongoDB Atlas Connection Error (Attempt ${attempt}/${retries}):`, error);
      if (attempt < retries) {
        await new Promise((res) => setTimeout(res, 3000));
      }
    }
  }
};

export const disconnectDB = async (): Promise<void> => {
  if (!isConnected) return;
  await mongoose.connection.close();
  isConnected = false;
  console.log('MongoDB disconnected.');
};
