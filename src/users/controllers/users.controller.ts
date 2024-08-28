import { Controller, Get, Post, Body, Param, Put, Delete, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/requests/createUserDto';
import { User } from '../schemas/user.schema';
import { UpdateUserDto } from '../dtos/requests/updateUserDto';
import { UUID } from 'crypto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<void> {
    const user = await this.usersService.create(createUserDto);
    res.status(HttpStatus.CREATED).json(user);
  }

  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    const users = await this.usersService.findAll();
    res.status(HttpStatus.OK).json(users);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response): Promise<void> {
    const user = await this.usersService.findOne(id);
    if (user) {
      res.status(HttpStatus.OK).json(user);
    } else {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found' });
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ): Promise<void> {
    const updatedUser = await this.usersService.update(id, updateUserDto);
    if (updatedUser) {
      res.status(HttpStatus.OK).json(updatedUser);
    } else {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found' });
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response): Promise<void> {
    const deletedUser = await this.usersService.delete(id);
    if (deletedUser) {
      res.status(HttpStatus.NO_CONTENT).send(); // 204 No Content for successful deletion
    } else {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found' });
    }
  }
}