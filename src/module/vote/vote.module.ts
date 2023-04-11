import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwt_config } from 'src/config/constant.config';
import { VoteController } from './vote.controller';
import { Vote } from './vote.entity';
import VoteResolver from './vote.resolver';
import { VoteService } from './vote.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vote]),
    JwtModule.register({
      secret: jwt_config.SECRET,
      signOptions: { expiresIn: jwt_config.EXPIRES_IN },
    }),
  ],
  controllers: [VoteController],
  providers: [VoteService, VoteResolver],
  exports: [],
})

export class VoteModule {}
