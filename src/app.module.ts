import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './course/course.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { Course } from './course/entities/course.entity';
import { RedisModule } from './redis/redis.module';
import { PaymentModule } from './payment/payment.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
 

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: 'config.env' }),
    RedisModule,
    MongooseModule.forRoot(process.env.MONGO_URL),
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'postgres',
      database: 'courses',
      port: 5432,
      host: 'localhost',
      password: '1234',
      synchronize: true,
      entities: [User, Course],
      autoLoadEntities: true,
    }), ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    CourseModule,
    UsersModule,
    AuthModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
