import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AbstractCrudService } from 'src/commons/utils/crud-abstract-class';
import { Permission } from '../schemas/permission.schema';
import { Model } from 'mongoose';

@Injectable()
export class PermissionsService extends AbstractCrudService<Permission> {
    constructor(@InjectModel(Permission.name) private readonly permissionModel: Model<Permission>) {
        super(permissionModel);
    }

    async update(id: string, updateRoleDto: any): Promise<Permission> {
        return super.update(id, updateRoleDto, ['createdAt']);
    }
}  

