import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { GatewayModule } from './gateway.module';
import { ViewExceptionFilter } from '../../../filters/view-exception.filter';
import { join } from 'path';
import { RedisStore } from "connect-redis";
import { createClient } from "redis";
import { createProxyMiddleware } from 'http-proxy-middleware';

const cookieParser = require('cookie-parser');
const session = require('express-session');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(GatewayModule);

  // Register the filter globally
  //app.useGlobalFilters(new ViewExceptionFilter());

  // 1. SET GLOBAL PREFIX
  // This ensures all your routes start with /api (e.g., /api/customer, /api/book)
  app.setGlobalPrefix('api');

  // 2. ENABLE CORS
  // Crucial so your Next.js app on port 3000 can communicate with this Gateway
  app.enableCors({
    origin: 'http://localhost:3000', 
    credentials: true, // Required for your Redis sessions/cookies to work
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,        // Strips away properties not in the DTO
    forbidNonWhitelisted: true, // Throws error if extra properties are sent
    transform: true,        // Automatically transforms types
  }));

  // Redis Client Setup

  // Change this:
  // REDIS_URL=redis://redis:6379

  // To this:
  // REDIS_URL=redis://localhost:6379
  // const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
  const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
  const redisClient = createClient({ url: redisUrl });
  redisClient.connect().catch((err) => console.error('❌ Redis Error:', err));

  const redisStore = new RedisStore({
    client: redisClient,
    prefix: "bookhaus_sess:",
  });

  // app.use(
  //   '/recommend',
  //   createProxyMiddleware({
  //     target: 'http://recommender-service:8000', // Points to your NestJS bridge
  //     changeOrigin: true,
  //     pathRewrite: {
  //       '^/recommend': '/recommend', // Ensure this maps correctly
  //     },
  //   }),
  // );

  // Middleware
  app.use(cookieParser());
  
  app.use(
    session({
      store: redisStore,
      secret: process.env.SESSION_SECRET || 'bookhaus_super_secret_key',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24,
      },
    }),
  );

  // 3. FIX THE PORT
  // Change from 3000 to 3001 so it doesn't clash with Next.js
  await app.listen(3001);
  console.log('🚀 Gateway API is live at http://localhost:3001/api');
}
bootstrap();
