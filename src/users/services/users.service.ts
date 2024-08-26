import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { AbstractCrudService } from 'src/commons/utils/crud-abstract-class';
import { CreateUserDto } from '../dtos/requests/createUserDto';
import { UpdateUserDto } from '../dtos/requests/updateUserDto';
import { User } from '../schemas/user.schema';

@Injectable()
export class UsersService extends AbstractCrudService<User> {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    super(userModel);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
      updatedAt: Date.now(),
    });

    return super.create(createdUser);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return super.update(id, updateUserDto, ['email', 'password', 'createdAt']);
  }
}