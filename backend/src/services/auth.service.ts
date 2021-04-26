import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';
import { AuthenticateRequest, RegisterRequest } from '../request-models';

interface IAuthentication {
  userId: string;
  token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async authenticate({
    email,
    password,
  }: AuthenticateRequest): Promise<IAuthentication> {
    const user = await this.userService.getUserByEmail(email, true);
    if (!user) {
      throw new UnauthorizedException({ message: 'Invalid email or password' });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      throw new UnauthorizedException({ message: 'Invalid email or password' });
    }
    return this.generateToken(user);
  }

  async register(data: RegisterRequest): Promise<IAuthentication> {
    const { email } = data;
    const checkUser = await this.userService.getUserByEmail(email);
    if (checkUser) {
      throw new BadRequestException({
        message: `User with ${email} email already exists`,
      });
    }
    const user = await this.userService.create(data);
    return this.generateToken(user);
  }

  private generateToken(user: any) {
    const { _id: userId, email } = user;
    const token = this.jwtService.sign({ userId, email });
    return { userId, email, token };
  }
}
