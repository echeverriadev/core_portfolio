import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RolesService } from './roles.service';
import { Role } from '../schemas/role.schema';
import { UpdateRoleDto } from '../dtos/requests/updateRoleDto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('RolesService', () => {
  let service: RolesService;
  let model: Model<Role>;

  const mockRole = {
    _id: '1',
    name: 'Test Role',
    description: 'Role for testing',
    createdAt: new Date(),
    updatedAt: new Date(),
    save: jest.fn().mockResolvedValue(this),
  } as unknown as Role;

  const mockModel = {
    findByIdAndUpdate: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(mockRole) }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: getModelToken(Role.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<RolesService>(RolesService);
    model = module.get<Model<Role>>(getModelToken(Role.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('update', () => {
    it('should update and return the role if found', async () => {
      const updateRoleDto: UpdateRoleDto = {
        name: 'Updated Role',
        description: 'Updated description',
      };

      const result = await service.update('1', updateRoleDto);

      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        '1',
        expect.objectContaining(updateRoleDto),
        { new: true },
      );
      expect(result).toEqual(mockRole);
    });

    it('should throw a NotFoundException if role not found', async () => {
      jest.spyOn(model, 'findByIdAndUpdate').mockImplementationOnce(() => ({ exec: jest.fn().mockResolvedValue(null) }) as any);

      await expect(service.update('1', { name: 'Updated Role' })).rejects.toThrow(NotFoundException);
    });
  });
});
