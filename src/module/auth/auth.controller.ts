import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async register(@Body() registerDto: RegisterDto) {
    const result = await this.authService.register(registerDto);

    return result;
  }

  @Post('signup')
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);

    return result;
  }
}
