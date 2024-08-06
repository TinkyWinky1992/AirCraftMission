import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from 'src/controllers/app.controller';
import { AppService, PrismaService } from 'src/service';
import { LoggerMiddleware } from 'src/middleware';
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('');
    consumer.apply().forRoutes('');
    consumer.apply().forRoutes('/timer');

  }
}
