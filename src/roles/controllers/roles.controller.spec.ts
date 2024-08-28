import { Test, TestingModule } from '@nestjs/testing';
import { RolesController } from './roles.controller';
import { RolesService } from '../services/roles.service';
import { CreateRoleDto } from '../dtos/requests/createRoleDto';
import { Role } from '../schemas/role.schema';
import { UpdateRoleDto } from '../dtos/requests/updateRoleDto';
import { Response } from 'express';
import { UUID } from 'crypto';

describe('RolesController', () => {
  let controller: RolesController;
  let service: RolesService;

  const mockRole = {
    _id: '66cea941ff05297429eac0b5',
    name: 'Admin',
    description: 'Administrator role',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRolesService = {
    create: jest.fn().mockResolvedValue(mockRole),
    findAll: jest.fn().mockResolvedValue([mockRole]),
    findOne: jest.fn().mockImplementation((id: string) =>
      id === 'existing-id' ? Promise.resolve(mockRole) : Promise.resolve(null),
    ),
    update: jest.fn().mockImplementation((id: string, updateRoleDto: UpdateRoleDto) =>
      id === 'existing-id' ? Promise.resolve({ ...mockRole, ...updateRoleDto }) : Promise.resolve(null),
    ),
    delete: jest.fn().mockImplementation((id: string) =>
      id === 'existing-id' ? Promise.resolve(mockRole) : Promise.resolve(null),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        {
          provide: RolesService,
          useValue: mockRolesService,
        },
      ],
    }).compile();

    controller = module.get<RolesController>(RolesController);
    service = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST to create a role', () => {
    it('should create a role and return 201 status', async () => {
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const createRoleDto: CreateRoleDto = {
        name: 'Admin',
        description: 'Administrator role',
      };

      await controller.create(createRoleDto, mockResponse);

      expect(service.create).toHaveBeenCalledWith(createRoleDto);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockRole);
    });
  });

  describe('GET to find all roles', () => {
    it('should return an array of roles with 200 status', async () => {
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      await controller.findAll(mockResponse);

      expect(service.findAll).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith([mockRole]);
    });
  });

  describe('GET to find one role by id', () => {
    it('should return a role with 200 status if found', async () => {
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      await controller.findOne('existing-id', mockResponse);

      expect(service.findOne).toHaveBeenCalledWith('existing-id');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockRole);
    });
  });

  describe('PUT to update one role by id', () => {
    it('should update a role and return 200 status if found', async () => {
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const updateRoleDto: UpdateRoleDto = {
        description: 'Updated description',
      };

      await controller.update('existing-id', updateRoleDto, mockResponse);

      expect(service.update).toHaveBeenCalledWith('existing-id', updateRoleDto);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ ...mockRole, ...updateRoleDto });
    });
  });

  describe('DELETE to delete one role by id', () => {
    it('should delete a role and return 204 status if found', async () => {
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      } as unknown as Response;

      await controller.delete('existing-id', mockResponse);

      expect(service.delete).toHaveBeenCalledWith('existing-id');
      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.send).toHaveBeenCalled();
    });
  });
});