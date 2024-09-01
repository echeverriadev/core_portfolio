import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from '../services/permissions.service';
import { CreatePermissionDto } from '../dtos/requests/createPermissionDto';
import { UpdatePermissionDto } from '../dtos/requests/updatePermissionDto';
import { Permission } from '../schemas/permission.schema';
import { Response } from 'express';

describe('PermissionsController', () => {
  let controller: PermissionsController;
  let service: PermissionsService;

  const mockPermission = {
    _id: '1',
    name: 'View Users',
    description: 'Allows viewing users',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPermissionsService = {
    create: jest.fn().mockResolvedValue(mockPermission),
    findAll: jest.fn().mockResolvedValue([mockPermission]),
    findOne: jest.fn().mockResolvedValue(mockPermission),
    update: jest.fn().mockResolvedValue(mockPermission),
    delete: jest.fn().mockResolvedValue(mockPermission),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionsController],
      providers: [
        {
          provide: PermissionsService,
          useValue: mockPermissionsService,
        },
      ],
    }).compile();

    controller = module.get<PermissionsController>(PermissionsController);
    service = module.get<PermissionsService>(PermissionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST to create permission', () => {
    it('should create a permission and return 201 status', async () => {
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const createPermissionDto: CreatePermissionDto = {
        name: 'View Users',
        description: 'Allows viewing users',
      };

      await controller.create(createPermissionDto, mockResponse);

      expect(service.create).toHaveBeenCalledWith(createPermissionDto);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockPermission);
    });
  });

  describe('GET to find all permissions', () => {
    it('should return an array of permissions with 200 status', async () => {
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      await controller.findAll(mockResponse);

      expect(service.findAll).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith([mockPermission]);
    });
  });

  describe('GET to find one permission by id', () => {
    it('should return a permission with 200 status if found', async () => {
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      await controller.findOne('1', mockResponse);

      expect(service.findOne).toHaveBeenCalledWith('1');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockPermission);
    });
  });

  describe('PUT to update one permission by id', () => {
    it('should update a permission and return 200 status if found', async () => {
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const updatePermissionDto: UpdatePermissionDto = {
        name: 'Edit Users',
        description: 'Allows editing users',
      };

      await controller.update('1', updatePermissionDto, mockResponse);

      expect(service.update).toHaveBeenCalledWith('1', updatePermissionDto);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockPermission);
    });
  });

  describe('DELETE to delete one permission by id', () => {
    it('should delete a permission and return 204 status', async () => {
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      } as unknown as Response;

      await controller.delete('1', mockResponse);

      expect(service.delete).toHaveBeenCalledWith('1');
      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.send).toHaveBeenCalled();
    });
  });
});
