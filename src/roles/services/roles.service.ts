import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractCrudService } from '../../commons/utils/crud-abstract-class';
import { UpdateRoleDto } from '../dtos/requests/updateRoleDto';
import { Role } from '../schemas/role.schema';

@Injectable()
export class RolesService extends AbstractCrudService<Role> {
    constructor(
        @InjectModel(Role.name) roleModel: Model<Role>,
    ) {
        super(roleModel);
    }

    async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
        return super.update(id, updateRoleDto, ['createdAt']);
    }
}  
