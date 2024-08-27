import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { PermissionsService } from '../permissions/services/permissions.service';
import { RolesService } from '../roles/services/roles.service';
import { Permission } from '../permissions/schemas/permission.schema';
import { Role } from '../roles/schemas/role.schema';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const permissionsService = app.get(PermissionsService);
  const rolesService = app.get(RolesService);

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

  await app.close();
}

bootstrap();
