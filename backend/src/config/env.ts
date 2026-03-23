import z from 'zod';

const EnvSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  JWT_SECRET: z.string().min(10, 'JWT_SECRET must be at least 10 characters'),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3000),
  HOST: z.string().min(7).default('localhost'),
});

const _env = EnvSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌💢Invalid environment variables', _env.error.format());
  throw new Error('Invalid environment variables');
}

export const env = _env.data;
