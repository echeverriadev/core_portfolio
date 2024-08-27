import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractCrudService } from '../../commons/utils/crud-abstract-class';
import { Permission } from '../schemas/permission.schema';

@Injectable()
export class PermissionsService extends AbstractCrudService<Permission> {
    constructor(
        @InjectModel(Permission.name) permissionModel: Model<Permission>,
    ) {
        super(permissionModel);
    }

    async update(id: string, updateRoleDto: any): Promise<Permission> {
        return super.update(id, updateRoleDto, ['createdAt']);
    }
}

