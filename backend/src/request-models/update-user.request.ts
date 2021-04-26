import { IsString, IsNotEmpty, IsDefined, IsEmail } from 'class-validator';

export class UpdateUserRequest {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  lastName: string;
}
