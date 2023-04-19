import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class CreatePostDto {
  //   @Field()
  //   user_id: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Type(() => String)
  @Field()
  content: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Type(() => String)
  @Field()
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Type(() => String)
  @Field()
  imageCover: string;
}
