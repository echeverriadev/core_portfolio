import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/requests/createUserDto';
import { User } from '../schemas/user.schema';
import { UpdateUserDto } from '../dtos/requests/updateUserDto';
import { Response } from 'express';
import { UUID } from 'crypto';
import { ObjectId } from 'mongoose';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUser = {
    _id: '66cea941ff05297429eac0b5',
    email: 'echeverriadev@gmail.com',
    password: 'hashedPassword',
    name: 'Carlos',
    lastName: 'Echeverria',
    phone: '+573105891873',
    roles: ['66ce6c89f1553650cc937983'],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockUserService = {
    create: jest.fn().mockResolvedValue(mockUser),
    findAll: jest.fn().mockResolvedValue([mockUser]),
    findOne: jest.fn().mockImplementation((id: ObjectId) =>
      id.toString() === '66cea941ff05297429eac0b5' ? Promise.resolve(mockUser) : Promise.resolve(null),
    ),
    update: jest.fn().mockImplementation((id: ObjectId, updateUserDto: UpdateUserDto) =>
      id.toString() === '66cea941ff05297429eac0b5' ? Promise.resolve({ ...mockUser, ...updateUserDto }) : Promise.resolve(null),
    ),
    delete: jest.fn().mockImplementation((id: ObjectId) =>
      id.toString() === '66cea941ff05297429eac0b5' ? Promise.resolve(mockUser) : Promise.resolve(null),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST to create user', () => {
    it('should create a user and return 201 status', async () => {
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const createUserDto: CreateUserDto = {
        email: 'echeverriadev@gmail.com',
        password: 'encryptedPassword',
        name: 'Carlos',
        lastName: 'Echeverria',
        phone: '+573105891873',
        roles: ['66ce6c89f1553650cc937983'],
      };

      await controller.create(createUserDto, mockResponse);

      expect(service.create).toHaveBeenCalledWith(createUserDto);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('GET to find all users', () => {
    it('should return an array of users with 200 status', async () => {
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      await controller.findAll(mockResponse);

      expect(service.findAll).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith([mockUser]);
    });
  });

  describe('GET to find one user by id', () => {
    it('should return a user with 200 status if found', async () => {
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      await controller.findOne('66cea941ff05297429eac0b5', mockResponse);

      expect(service.findOne).toHaveBeenCalledWith('66cea941ff05297429eac0b5');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
    });

    it('should return 404 status if user not found', async () => {
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      await controller.findOne('66cea941ff05297429eac0b6', mockResponse);

      expect(service.findOne).toHaveBeenCalledWith('66cea941ff05297429eac0b6');
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User not found' });
    });
  });

  describe('PUT to update one user by id', () => {
    it('should update a user and return 200 status if found', async () => {
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const updateUserDto: UpdateUserDto = {
        name: 'Updated Name',
      };

      await controller.update('66cea941ff05297429eac0b5', updateUserDto, mockResponse);

      expect(service.update).toHaveBeenCalledWith('66cea941ff05297429eac0b5', updateUserDto);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ ...mockUser, ...updateUserDto });
    });

    it('should return 404 status if user not found', async () => {
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const updateUserDto: UpdateUserDto = {
        name: 'Updated Name',
      };

      await controller.update('66cea941ff05297429eac0b6', updateUserDto, mockResponse);

      expect(service.update).toHaveBeenCalledWith('66cea941ff05297429eac0b6', updateUserDto);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User not found' });
    });
  });

  describe('DELETE to delete one user by id', () => {
    it('should delete a user and return 204 status if found', async () => {
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      } as unknown as Response;

      await controller.delete('66cea941ff05297429eac0b5', mockResponse);

      expect(service.delete).toHaveBeenCalledWith('66cea941ff05297429eac0b5');
      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.send).toHaveBeenCalled();
    });

    it('should return 404 status if user not found', async () => {
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      await controller.delete('66cea941ff05297429eac0b6', mockResponse);

      expect(service.delete).toHaveBeenCalledWith('66cea941ff05297429eac0b6');
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User not found' });
    });
  });
});
