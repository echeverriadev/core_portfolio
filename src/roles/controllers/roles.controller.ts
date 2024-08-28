import { Body, Controller, Post, Get, Put, Delete, Param, Res, HttpStatus } from '@nestjs/common';
import { Role } from '../schemas/role.schema';
import { RolesService } from '../services/roles.service';
import { UUID } from 'crypto';
import { CreateRoleDto } from '../dtos/requests/createRoleDto';
import { UpdateRoleDto } from '../dtos/requests/updateRoleDto';
import { Response } from 'express';

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) { }

    @Post()
    async create(@Body() createRoleDto: CreateRoleDto, @Res() res: Response): Promise<void> {
        const role = await this.rolesService.create(createRoleDto);
        res.status(HttpStatus.CREATED).json(role);
    }

    @Get()
    async findAll(@Res() res: Response): Promise<void> {
        const roles = await this.rolesService.findAll();
        res.status(HttpStatus.OK).json(roles);
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Res() res: Response): Promise<void> {
        const role = await this.rolesService.findOne(id);
        if (role) {
            res.status(HttpStatus.OK).json(role);
        } else {
            res.status(HttpStatus.NOT_FOUND).json({ message: 'Role not found' });
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto, @Res() res: Response): Promise<void> {
        const updatedRole = await this.rolesService.update(id, updateRoleDto);
        if (updatedRole) {
            res.status(HttpStatus.OK).json(updatedRole);
        } else {
            res.status(HttpStatus.NOT_FOUND).json({ message: 'Role not found' });
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @Res() res: Response): Promise<void> {
        const deletedRole = await this.rolesService.delete(id);
        if (deletedRole) {
            res.status(HttpStatus.NO_CONTENT).send(); // 204 No Content for successful deletion
        } else {
            res.status(HttpStatus.NOT_FOUND).json({ message: 'Role not found' });
        }
    }
}
