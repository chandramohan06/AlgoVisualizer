import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { env } from './config/env';
import { apiLimiter } from './middlewares/rateLimit.middleware';
import { errorMiddleware } from './middlewares/error.middleware';
import { router } from './routes';

const app = express();

// ─── Security ───────────────────────────────────────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: env.CLIENT_URL,
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
      rssMB: Math.round(memUsage.rss / 1024 / 1024 * 100) / 100,
      heapUsedMB: Math.round(memUsage.heapUsed / 1024 / 1024 * 100) / 100,
    },
  });
};

app.get('/api/health', healthHandler);
app.get('/api/v1/health', healthHandler);

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/v1', router);
app.use('/api', router);

// ─── Debug: list all registered routes (dev only) ────────────────────────────
if (env.NODE_ENV === 'development') {
  app.get('/api/debug/routes', (_req, res) => {
    const routes: { method: string; path: string }[] = [];
    const extract = (stack: any[], prefix: string) => {
      stack.forEach((layer: any) => {
        if (layer.route) {
          Object.keys(layer.route.methods).forEach((method) => {
            routes.push({ method: method.toUpperCase(), path: prefix + layer.route.path });
          });
        } else if (layer.name === 'router' && layer.handle?.stack) {
          const match = layer.regexp?.source?.match(/\\^\\\\\/([^\\\\]+)\\\\\//);
          const sub = match ? `/${match[1]}` : '';
          extract(layer.handle.stack, prefix + sub);
        }
      });
    };
    extract((app as any)._router.stack, '');
    res.json({ count: routes.length, routes });
  });
}

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ─── Global Error Handler ────────────────────────────────────────────────────
app.use(errorMiddleware);

export default app;
