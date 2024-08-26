import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PermissionsService } from '../services/permissions.service';
import { Permission } from '../schemas/permission.schema';
import { UUID } from 'crypto';

@Controller('permissions')
export class PermissionsController {
    constructor(private readonly rolesService: PermissionsService) { }

    @Post()
    create(@Body() createRoleDto: any): Promise<Permission> {
        return this.rolesService.create(createRoleDto);
    }

    @Get()
    findAll(): Promise<Permission[]> {
        return this.rolesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: UUID): Promise<Permission> {
        return this.rolesService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: UUID, @Body() updateRoleDto: any): Promise<Permission> {
        return this.rolesService.update(id, updateRoleDto);
    }

    @Delete(':id')
    delete(@Param('id') id: UUID): Promise<Permission> {
        return this.rolesService.delete(id);
    }
}
