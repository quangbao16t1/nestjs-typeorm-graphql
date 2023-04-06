import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetAllUserDto } from './dto/getAllUser.dto';
import { AuthorService } from './author.service';
import { AuthGuard } from '../auth/strategy/auth.guard';
import { User } from 'src/decorator/user.decorator';

@ApiTags('Authors')
@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  async getAllUsers(@Body() getAllUsersDto: GetAllUserDto, @User() userInfo: any): Promise<any> {
    console.log(222, userInfo)
    const listUsers = await this.authorService.getAllUsers(getAllUsersDto);
    
    return listUsers;
  }
}
