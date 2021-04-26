import {
  IsString,
  IsNotEmpty,
  IsDefined,
  IsOptional,
  IsEmail,
  Min,
  Max,
  MinLength,
  MaxLength,
  IsIn,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GenderType } from '../common/types';

export class CreateReviewRequest {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty({ message: 'Please enter email' })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty({ message: 'Please enter a first name.' })
  @MinLength(3, { message: 'first name length can not be less than 3' })
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty({ message: 'Please enter last name.' })
  @MinLength(3, { message: 'last name length can not be less than 3' })
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsDefined()
  @IsOptional()
  @IsString()
  middleName: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty({ message: 'Please choose your rate.' })
  @Min(1, { message: 'Rate can not be less than 1' })
  @Max(5, { message: 'Rate can not exceed 5' })
  @IsNumber()
  rate: number;

  @ApiProperty()
  @IsDefined()
  @IsOptional()
  @IsNumber()
  age: number;

  @ApiProperty()
  @IsDefined()
  @IsOptional()
  @MinLength(5, { message: 'Country length can not be less than 3' })
  @IsString()
  country: string;

  @ApiProperty()
  @IsDefined()
  @IsOptional()
  @IsString()
  @IsIn([GenderType.Male, GenderType.Female])
  gender: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty({ message: 'Please enter suggested improvements.' })
  @IsString()
  improvements: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty({ message: 'Origin is not provided please provide origin' })
  @IsString()
  origin: string;
}
