import type { INestApplication } from '@nestjs/common';
import compression from 'compression';
import helmet from 'helmet';

export function middleware(app: INestApplication): INestApplication {
  const isProduction = process.env.NODE_ENV === 'production';

  app.use(compression());
  app.use(
    helmet({
      contentSecurityPolicy: isProduction ? undefined : false,
      crossOriginEmbedderPolicy: isProduction ? undefined : false,
    }),
  );
  // app.enableCors();

  return app;
}
