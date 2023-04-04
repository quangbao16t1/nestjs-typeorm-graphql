import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwt_config } from 'src/config/constant.config';
import { AuthorController } from './author.controller';
import { Author } from './author.entity';
import { AuthorService } from './author.service';
import AuthorsResolver from './../../resolvers/authors/author.resolver'

@Module({
  imports: [
    TypeOrmModule.forFeature([Author]),
    JwtModule.register({
      secret: jwt_config.SECRET,
      signOptions: { expiresIn: jwt_config.EXPIRES_IN },
    }),
  ],
  controllers: [
    AuthorController
  ],
  providers: [
    AuthorService,
    AuthorsResolver
  ],
  exports: [],
})

export class AuthorModule{}
