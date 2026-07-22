import mongoose from 'mongoose';
import { env } from './env';

let isConnected = false;

export const connectDB = async (): Promise<void> => {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(env.MONGODB_URI, {
      dbName: 'algovisualizer',
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = true;
    console.log(`✅  MongoDB connected to Atlas: ${conn.connection.host}`);

    // Auto-seed database if empty
    const { seedDatabase } = await import('../utils/seeder');
    await seedDatabase();
  } catch (error) {
    console.error("❌ MongoDB Atlas Connection Error:", error);
    console.dir(error, { depth: null });
    process.exit(1);
  }
};

export const disconnectDB = async (): Promise<void> => {
  if (!isConnected) return;
  await mongoose.connection.close();
  isConnected = false;
  console.log('MongoDB disconnected.');
};
