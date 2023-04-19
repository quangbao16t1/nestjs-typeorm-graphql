import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateAuthorDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Type(() => String)
  @Field()
  first_name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Type(() => String)
  @Field()
  last_name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Type(() => Boolean)
  @Field({ nullable: true })
  gender: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  public_address: string;


  @ApiProperty()
  @IsOptional()
  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  avatar: string;


  @ApiProperty()
  @IsOptional()
  @IsString()
  @Type(() => Number)
  @Field()
  nonce: number;
}
