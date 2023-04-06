import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import AuthorResolver from './module/user/author.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthorModule } from './module/user/author.module';
import { PostModule } from './module/post/post.module';
import { RepoModule } from './module/repo/repo.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './module/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwt_config } from './config/constant.config';

const graphQLImports = [
  AuthorResolver,
];

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    JwtModule.register({
      secret: jwt_config.SECRET,
      signOptions: { expiresIn: jwt_config.EXPIRES_IN },
    }),
    EventEmitterModule.forRoot(),
    // AuthorResolver,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: true,
    }),
    AuthorModule,
    PostModule,
    AuthModule,
    RepoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
