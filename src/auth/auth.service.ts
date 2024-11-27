import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User} from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { IJwtPayload } from 'src/common/interface/interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService:UserService,
    private readonly jwtService:JwtService
  ){}

  async validateUser(email: string, password: string): Promise<User> {
    return this.validateEntity<User>(email, password, this.userService.getUserByEmail.bind(this.userService));
  }

  private async validateEntity<T>(
    email: string,
    password: string,
    getEntityByEmail: (email: string) => Promise<T & { password: string }>,
  ): Promise<T> {
    const entity = await getEntityByEmail(email);
    if (!entity) {
      throw new BadRequestException('User not found');
    }

    if (!await this.comparePasswords(password, entity.password)) {
      throw new BadRequestException('Invalid credentials');
    }

    return entity;
  }

  private async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateJwtPayload(payload: IJwtPayload): Promise<User | null> {
    const user = await this.userService.getUserById(payload.id);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }

  async userLogin(user: User) {
    const payload: IJwtPayload = { email: user.email, id: user._id.toString() };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '60s', // Token expiration time
    });
    return { accessToken };
  }
}
