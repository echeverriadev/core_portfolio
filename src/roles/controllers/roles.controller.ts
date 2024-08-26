import { Body, Controller, Post, Get, Put, Delete, Param } from '@nestjs/common';
import { Role } from '../schemas/role.schema';
import { RolesService } from '../services/roles.service';
import { UUID } from 'crypto';
import { CreateRoleDto } from '../dtos/requests/createRoleDto';
import { UpdateRoleDto } from '../dtos/requests/updateRoleDto';

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Post()
    create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
        return this.rolesService.create(createRoleDto);
    }

    @Get()
    findAll(): Promise<Role[]> {
        return this.rolesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: UUID): Promise<Role> {
        return this.rolesService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: UUID, @Body() updateRoleDto: UpdateRoleDto): Promise<Role> {
        return this.rolesService.update(id, updateRoleDto);
    }

    @Delete(':id')
    delete(@Param('id') id: UUID): Promise<Role> {
        return this.rolesService.delete(id);
    }
}
