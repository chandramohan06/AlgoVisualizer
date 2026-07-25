import mongoose from 'mongoose';
import { env } from './env';

let isConnected = false;

// Connection Event Diagnostics
mongoose.connection.on('connected', () => {
  console.log(`[Mongoose Event] 'connected' | readyState = ${mongoose.connection.readyState} (1=Connected)`);
  isConnected = true;
});

mongoose.connection.on('disconnected', () => {
  console.warn(`[Mongoose Event] 'disconnected' | readyState = ${mongoose.connection.readyState} (0=Disconnected)`);
  isConnected = false;
  connectDB().catch((err) => console.error('Auto-reconnect error:', err));
});

mongoose.connection.on('error', (err) => {
  console.error(`[Mongoose Event] 'error': ${err.message} | readyState = ${mongoose.connection.readyState}`);
});

mongoose.connection.on('reconnected', () => {
  console.log(`[Mongoose Event] 'reconnected' | readyState = ${mongoose.connection.readyState}`);
  isConnected = true;
});

mongoose.connection.on('reconnectFailed', () => {
  console.error(`[Mongoose Event] 'reconnectFailed' | readyState = ${mongoose.connection.readyState}`);
  isConnected = false;
});

export const connectDB = async (retries = 10): Promise<void> => {
  console.log(`[connectDB] Called. readyState = ${mongoose.connection.readyState}, URI = ${env.MONGODB_URI.substring(0, 30)}...`);
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
      console.log(`✅  MongoDB connected to Atlas: ${conn.connection.host} | readyState = ${mongoose.connection.readyState}`);

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

export const disconnectDB = async (): Promise<void> => {
  if (!isConnected) return;
  await mongoose.connection.close();
  isConnected = false;
  console.log('MongoDB disconnected.');
};
