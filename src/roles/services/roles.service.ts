import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AbstractCrudService } from 'src/commons/utils/crud-abstract-class';
import { Role } from '../schemas/role.schema';
import { Model } from 'mongoose';
import { UpdateRoleDto } from '../dtos/requests/updateRoleDto';

@Injectable()
export class RolesService extends AbstractCrudService<Role> {
    constructor(@InjectModel(Role.name) private readonly roleModel: Model<Role>) {
        super(roleModel);
    }

    async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
        return super.update(id, updateRoleDto, ['createdAt']);
    }
}  
