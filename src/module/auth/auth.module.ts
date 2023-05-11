import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from '../user/author.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwt_config } from 'src/config/constant.config';
import { GoogleStrategy } from './strategy/google.strategy';
import { GithubOauthStrategy } from './strategy/github.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Author]),
    JwtModule.register({
      secret: jwt_config.SECRET,
      signOptions: { expiresIn: jwt_config.EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, GithubOauthStrategy],
  exports: [],
})

export class AuthModule {}
