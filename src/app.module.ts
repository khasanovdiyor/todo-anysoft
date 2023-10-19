import { Module } from '@nestjs/common';
import { KnexModule } from './knex';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import KnexConfig from './config/knex.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    KnexModule.register(KnexConfig.getKnexOptions()),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
