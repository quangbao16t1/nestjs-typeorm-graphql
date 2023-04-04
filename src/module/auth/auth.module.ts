import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from '../user/author.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwt_config } from 'src/config/constant.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Author]),
    JwtModule.register({
      secret: jwt_config.SECRET,
      signOptions: { expiresIn: jwt_config.EXPIRES_IN },
    }),
  ],
  controllers: [
    AuthController
  ],
  providers: [AuthService],
  exports: [],
})

export class AuthModule {}
