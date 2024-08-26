import { IsOptional, IsNotEmpty, ValidateIf } from 'class-validator';
import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './createUserDto';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['email', 'password', 'createdAt'] as const)
) {
  @ValidateIf((o) => o.email !== undefined)
  @IsNotEmpty({ message: 'Email field cannot be modified' })
  email?: never;

  @ValidateIf((o) => o.password !== undefined)
  @IsNotEmpty({ message: 'Password field cannot be modified' })
  password?: never;

  @ValidateIf((o) => o.createdAt !== undefined)
  @IsNotEmpty({ message: 'CreatedAt field cannot be modified' })
  createdAt?: never;
}
