import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateCommentDto {
  @ApiProperty()
  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
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
