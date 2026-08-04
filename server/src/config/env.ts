import { z } from 'zod';

const DEFAULT_MONGODB_URI = 'mongodb+srv://chandramohankumarsingh06_db_user:golu26@algovisualizer.td1z1g6.mongodb.net/algovisualizer?retryWrites=true&w=majority&appName=AlgoVisualizer';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.string().default('3000'),

  // MongoDB
  MONGODB_URI: z
    .string()
    .transform((val) => {
      if (!val || val.trim() === '' || val.includes('localhost') || val.includes('127.0.0.1')) {
        return DEFAULT_MONGODB_URI;
      }
      return val;
    })
    .default(DEFAULT_MONGODB_URI),

  // JWT
  JWT_ACCESS_SECRET: z
    .string()
    .min(16, 'JWT_ACCESS_SECRET must be at least 16 chars')
    .default('default_development_access_secret_key_algovisualizer_32_chars'),
  JWT_REFRESH_SECRET: z
    .string()
    .min(16, 'JWT_REFRESH_SECRET must be at least 16 chars')
    .default('default_development_refresh_secret_key_algovisualizer_32_chars'),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),

  // Email
  EMAIL_HOST: z.string().default('smtp.gmail.com'),
  EMAIL_PORT: z.string().default('587'),
  EMAIL_USER: z.string().default(''),
  EMAIL_PASS: z.string().default(''),
  EMAIL_FROM: z.string().default('noreply@algovisualizer.com'),

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: z.string().default(''),
  CLOUDINARY_API_KEY: z.string().default(''),
  CLOUDINARY_API_SECRET: z.string().default(''),

  // CORS
  CLIENT_URL: z.string().default('http://localhost:5173'),
});

export type Env = z.infer<typeof envSchema>;

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:');
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
