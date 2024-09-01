import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dtos/requests/createUserDto';
import { UpdateUserDto } from '../dtos/requests/updateUserDto';
import { User } from '../schemas/user.schema';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  describe('create', () => {
    it('should hash the password and create a user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@test.com',
        password: 'password',
        name: 'name',
        lastName: 'last name',
        phone: '3105891873',
        roles: ['role_id']
      };
      const hashedPassword = 'hashedPassword';
      jest.spyOn(bcrypt, 'genSalt').mockResolvedValue('salt');
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);
      jest.spyOn(userModel, 'create').mockResolvedValue(createUserDto as any);

      const result = await service.create(createUserDto);

      expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
      expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, 'salt');
      expect(userModel.create).toHaveBeenCalledWith({
        ...createUserDto,
        password: hashedPassword,
      });
      expect(result).toEqual(createUserDto);
    });
  });

  describe('update', () => {
    it('should call update with correct parameters', async () => {
      const id = 'someId';
      const updateUserDto: UpdateUserDto = { phone: '3503980044' };
      const updatedUser = { ...updateUserDto, id } as unknown as User;
      jest.spyOn(service, 'update').mockResolvedValue(updatedUser);
  
      const result = await service.update(id, updateUserDto);
  
      expect(service.update).toHaveBeenCalled();
      expect(result).toEqual(updatedUser);
    });
  });

  describe('findOneByEmail', () => {
    it('should call findOne with correct email', async () => {
      const email = 'test@test.com';
      const user = { email } as User;
      jest.spyOn(userModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(user),
      } as any);

      const result = await service.findOneByEmail(email);

      expect(userModel.findOne).toHaveBeenCalledWith({ email });
      expect(result).toEqual(user);
    });
  });
});
