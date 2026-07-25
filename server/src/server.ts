import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');

import './config/env'; // validate env first
import app from './app';
import { connectDB } from './config/db';
import { env } from './config/env';

const PORT = Number(process.env.PORT || env.PORT) || 3000;

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`\n🚀  AlgoVisualizer API running on http://0.0.0.0:${PORT}`);
      console.log(`📚  Docs:   http://0.0.0.0:${PORT}/api/v1/health`);
      console.log(`🌍  Env:    ${env.NODE_ENV}\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

process.on('unhandledRejection', (reason: unknown) => {
  console.error('Unhandled Promise Rejection:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error: Error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

startServer();
