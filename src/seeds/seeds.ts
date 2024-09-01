import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { Permission } from '../permissions/schemas/permission.schema';
import { PermissionsService } from '../permissions/services/permissions.service';
import { Role } from '../roles/schemas/role.schema';
import { RolesService } from '../roles/services/roles.service';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/services/users.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const permissionsService = app.get(PermissionsService);
  const rolesService = app.get(RolesService);
  const usersService = app.get(UsersService);

  const permissions = [
    { name: 'all_permissions', description: 'All permissions' },
  ] as Permission[];

  for (const permission of permissions) {
    await permissionsService.create(permission);
  }

  const roles = [
    {
      name: 'Admin',
      description: 'Administrator role',
      permissions: (await permissionsService.findAll()).map(p => p._id),
    },
  ] as Role[];

  for (const role of roles) {
    await rolesService.create(role);
  }

  const user = {
    email: 'echeverriadev@gmail.com',
    password: '123456',
    roles: (await rolesService.findAll()).map(r => r._id.toString()) as string[],
    name: 'Carlos',
    lastName: 'Echeverria',
    phone: '3105891873',
  } as unknown as User;

  await usersService.create(user);

  await app.close();
}

bootstrap();
