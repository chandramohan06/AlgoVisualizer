import './config/env'; // validate env first
import app from './app';
import { connectDB } from './config/db';
import { env } from './config/env';

const PORT = Number(env.PORT) || 3000;

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`\n🚀  AlgoVisualizer API running on http://localhost:${PORT}`);
      console.log(`📚  Docs:   http://localhost:${PORT}/api/v1/health`);
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
