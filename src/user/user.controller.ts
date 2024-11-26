import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() createUserDto: CreateUserDto): Promise<any> {
      console.log("Received payload in controller:", createUserDto);
      if (!createUserDto.password) {
        throw new BadRequestException('Password is required');
      }
      const user = await this.userService.createUser(createUserDto);
      if (!user) {
        throw new BadRequestException('User registration failed');
      }
      return user;
    }
}