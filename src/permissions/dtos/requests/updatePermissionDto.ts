import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, ValidateIf } from 'class-validator';
import { CreatePermissionDto } from './createPermissionDto';

export class UpdatePermissionDto extends PartialType(
  OmitType(CreatePermissionDto, ['createdAt'] as const)
) {
  @ValidateIf((o) => o.createdAt !== undefined)
  @IsNotEmpty({ message: 'CreatedAt field cannot be modified' })
  createdAt?: never;
}
