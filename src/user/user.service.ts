import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>){}
  async createUser(payload:CreateUserDto): Promise<User>{
    const {firstName, lastName, username, password, email} = payload
    const emailExists = await this.userModel.findOne({email}).exec();
    if(emailExists){
      throw new BadRequestException (" This email has already been used");
    }

    const hashedPassword = await this.hashedPassword(password);

    const user = new this.userModel({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword
    });

    return user.save()
  }

  private async hashedPassword(password: string): Promise<string>{
    if (!password){
      throw new Error ('Password is required');
    }
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds)
  }

  async getUserById(id: string): Promise<User>{
    return this.userModel.findById(id).exec();
  }
  
  async getUserByEmail( email: string): Promise<User>{
    return this.userModel.findOne({email}).exec();
  }
}
