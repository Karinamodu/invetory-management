import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { SupplierModule } from './supplier/supplier.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { LoggerModule } from './common/logger';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
      })
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    LoggerModule,
    UserModule,
    ProductModule,
    SupplierModule,
    AuthModule,
    OrderModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

// npm install joi
