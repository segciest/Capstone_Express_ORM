import { Body, Controller, Headers, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() body) {
    return this.authService.signUp(body);
  }

  @Post('login')
  async login(@Body() body) {
    return this.authService.login(body);
  }

  @Post('reset-token')
  async resetToken(@Headers() headers) {
    const token = headers.authorization?.split(' ')[1];
    if (!token) {
      return {
        data: '',
        message: 'Token not provided',
        status: HttpStatus.UNAUTHORIZED,
        date: new Date(),
      };
    }
    return this.authService.resetToken(token);
  }
}
