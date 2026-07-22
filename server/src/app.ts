import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import path from 'path';
import { env } from './config/env';
import { apiLimiter } from './middlewares/rateLimit.middleware';
import { errorMiddleware } from './middlewares/error.middleware';
import { router } from './routes';

const app = express();

// ─── Security ───────────────────────────────────────────────────────────────
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
);

const allowedOrigins = [
  env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:3000',
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (
        env.CLIENT_URL === '*' ||
        allowedOrigins.includes(origin) ||
        origin.endsWith('.onrender.com')
      ) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// ─── Logging ─────────────────────────────────────────────────────────────────
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// ─── Body Parsing ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ─── Serve Static Frontend Assets (Production Docker / Render) ───────────────
const clientDistPath = path.join(__dirname, '../../client/dist');
app.use(express.static(clientDistPath));

// ─── Rate Limiting ───────────────────────────────────────────────────────────
app.use('/api', apiLimiter);

// ─── Health Check Endpoints ──────────────────────────────────────────────────
const healthHandler = (_req: express.Request, res: express.Response) => {
  const dbState = mongoose.connection.readyState;
  const dbStatusMap: Record<number, string> = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting',
  };

  const memUsage = process.memoryUsage();

  res.status(200).json({
    status: 'pass',
    success: true,
    message: 'AlgoVisualizer SaaS API is operational 🚀',
    version: '1.4.2',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
    database: {
      status: dbStatusMap[dbState] || 'Unknown',
      stateCode: dbState,
    },
    memory: {
      rssMB: Math.round((memUsage.rss / 1024 / 1024) * 100) / 100,
      heapUsedMB: Math.round((memUsage.heapUsed / 1024 / 1024) * 100) / 100,
    },
  });
};

app.get('/api/health', healthHandler);
app.get('/api/v1/health', healthHandler);

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/v1', router);
app.use('/api', router);

// ─── SPA Fallback Routing ────────────────────────────────────────────────────
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(clientDistPath, 'index.html'), (err) => {
    if (err) {
      res.status(404).json({ success: false, message: 'Route not found' });
    }
  });
});

// ─── Global Error Handler ────────────────────────────────────────────────────
app.use(errorMiddleware);

export default app;
