import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateCommentDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Field()
  post_id: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Field({ nullable: true })
  parent_id: number;

  @ApiProperty()
  @IsString()
  @Type(() => String)
  @Field()
  content: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  attachment: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  @Field({ nullable: true })
  publish: boolean;
}
