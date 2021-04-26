import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services';
import { AuthenticateRequest, RegisterRequest } from '../request-models';

@Controller('/api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/authenticate')
  async authenticate(@Body() data: AuthenticateRequest): Promise<any> {
    return await this.authService.authenticate(data);
  }

  @Post('/register')
  async register(@Body() data: RegisterRequest): Promise<any> {
    return await this.authService.register(data);
  }
}
