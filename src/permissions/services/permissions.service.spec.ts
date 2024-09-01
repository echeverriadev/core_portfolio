import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { UpdatePermissionDto } from '../dtos/requests/updatePermissionDto';
import { Permission } from '../schemas/permission.schema';
import { PermissionsService } from './permissions.service';

describe('PermissionsService', () => {
  let service: PermissionsService;
  let model: Model<Permission>;

  const mockPermission = {
    _id: '1',
    name: 'Test Permission',
    description: 'Permission to test',
    createdAt: new Date(),
    updatedAt: new Date(),
    save: jest.fn().mockResolvedValue(this),
  } as unknown as Permission;

  const mockModel = {
    findByIdAndUpdate: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(mockPermission) }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionsService,
        {
          provide: getModelToken(Permission.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<PermissionsService>(PermissionsService);
    model = module.get<Model<Permission>>(getModelToken(Permission.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('update', () => {
    it('should update and return the permission if found', async () => {
      const updatePermissionDto: UpdatePermissionDto = {
        name: 'Updated Permission',
        description: 'Updated description',
      };

      const result = await service.update('1', updatePermissionDto);

      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        '1',
        expect.objectContaining(updatePermissionDto),
        { new: true },
      );
      expect(result).toEqual(mockPermission);
    });

    it('should throw a NotFoundException if permission not found', async () => {
      (model.findByIdAndUpdate as jest.Mock).mockReturnValueOnce({ exec: jest.fn().mockResolvedValue(null) });

      await expect(service.update('1', { name: 'Updated Permission' })).rejects.toThrow(NotFoundException);
    });
  });
});
