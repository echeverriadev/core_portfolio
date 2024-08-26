import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, ValidateIf } from 'class-validator';
import { CreateRoleDto } from './createRoleDto';

export class UpdateRoleDto extends PartialType(
  OmitType(CreateRoleDto, ['createdAt'] as const)
) {
  @ValidateIf((o) => o.createdAt !== undefined)
  @IsNotEmpty({ message: 'CreatedAt field cannot be modified' })
  createdAt?: never;
}
