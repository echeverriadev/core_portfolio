import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { PermissionsService } from '../permissions/services/permissions.service';
import { RolesService } from '../roles/services/roles.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const permissionsService = app.get(PermissionsService);
  const rolesService = app.get(RolesService);

  const permissions: any[] = [
    { name: 'all_permissions', description: 'All permissions' },
  ];

  for (const permission of permissions) {
    await permissionsService.create(permission);
  }

  const roles: any[] = [
    {
      name: 'Admin',
      description: 'Administrator role',
      permissions: (await permissionsService.findAll()).map(p => p._id),
    },
  ];

  for (const role of roles) {
    await rolesService.create(role);
  }

  await app.close();
}

bootstrap();
