import { IsString, IsNotEmpty, IsDefined, IsEmail } from 'class-validator';

export class AuthenticateRequest {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  password: string;
}
