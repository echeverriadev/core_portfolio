import { IsEmail, IsNotEmpty, IsString, IsOptional, IsPhoneNumber, IsArray, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsPhoneNumber(null)
  @IsNotEmpty()
  phone: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  roleIds: string[];

  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  updatedAt?: Date;
}
