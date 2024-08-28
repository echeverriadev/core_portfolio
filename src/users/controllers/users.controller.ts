import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from '../dtos/requests/createUserDto';
import { UpdateUserDto } from '../dtos/requests/updateUserDto';
import { UsersService } from '../services/users.service';

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
    res.status(HttpStatus.OK).json(user);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ): Promise<void> {
    const updatedUser = await this.usersService.update(id, updateUserDto);
    res.status(HttpStatus.OK).json(updatedUser);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response): Promise<void> {
    const deletedUser = await this.usersService.delete(id);
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
