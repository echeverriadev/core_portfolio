import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './createUserDto';

export class UpdateUserDto extends PartialType(
    OmitType(CreateUserDto, ['email', 'password', 'createdAt'] as const)
  ) {}
