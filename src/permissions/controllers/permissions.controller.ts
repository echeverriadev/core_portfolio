import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreatePermissionDto } from '../dtos/requests/createPermissionDto';
import { UpdatePermissionDto } from '../dtos/requests/updatePermissionDto';
import { PermissionsService } from '../services/permissions.service';

@Controller('permissions')
export class PermissionsController {
    constructor(private readonly rolesService: PermissionsService) { }

    @Post()
    async create(@Body() createPermissionDto: CreatePermissionDto, @Res() res: Response): Promise<void> {
        const permission = await this.rolesService.create(createPermissionDto);
        res.status(HttpStatus.CREATED).json(permission);
    }

    @Get()
    async findAll(@Res() res: Response): Promise<void> {
        const permissions = await this.rolesService.findAll();
        res.status(HttpStatus.OK).json(permissions);
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Res() res: Response): Promise<void> {
        const permission = await this.rolesService.findOne(id);
        res.status(HttpStatus.OK).json(permission);

    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto, @Res() res: Response): Promise<void> {
        const updatedPermission = await this.rolesService.update(id, updatePermissionDto);
        res.status(HttpStatus.OK).json(updatedPermission);
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @Res() res: Response): Promise<void> {
        const deletedPermission = await this.rolesService.delete(id);
        res.status(HttpStatus.NO_CONTENT).send();
    }
}