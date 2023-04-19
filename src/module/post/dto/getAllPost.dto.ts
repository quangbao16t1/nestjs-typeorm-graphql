import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class GetAllPostDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    @Type(() => String)
    keyword?: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    limit?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    page?: number;

    // @ApiProperty()
    // @IsOptional()
    // @Type(() => String)
    // filter?: string
}