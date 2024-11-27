import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './entities/user.entity';
import { LoggerModule } from 'src/common/logger';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: User.name, schema: userSchema
    }]),
    LoggerModule
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService, MongooseModule]
})
export class UserModule {}
