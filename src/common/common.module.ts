import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { LoggerContextMiddleware } from './middleware';
import * as providers from './provider';

const services = Object.values(providers);

@Global()
@Module({
  providers: services,
  exports: services,
})
export class CommonModule implements NestModule {
  // Global Middleware
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerContextMiddleware).forRoutes('*');
  }
}
