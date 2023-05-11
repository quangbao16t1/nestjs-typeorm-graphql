import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    return await this.authService.googleLogin(req)
  }

  @Get('github')
	@UseGuards(AuthGuard('github'))
	async githubAuth() {
		// With `@UseGuards(GithubOauthGuard)` we are using an AuthGuard that @nestjs/passport
		// automatically provisioned for us when we extended the passport-github strategy.
		// The Guard initiates the passport-github flow.
	}

	@Get('github/callback')
	@UseGuards(AuthGuard('github'))
	async githubAuthCallback(@Req() req, @Res({ passthrough: true }) res) {
    return await this.authService.githubLogin(req);
	}
}
