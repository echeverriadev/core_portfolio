import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../../users/services/users.service';
import { LoginRequestDto } from '../dtos/requests/loginRequestDto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('sign-in')
  async signin(@Body() loginDto: LoginRequestDto): Promise<{ accessToken: string }> {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    return this.authService.signIn(user);
  }
}
