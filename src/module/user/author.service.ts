import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonLogger } from 'src/share/common/logger/common.logger';
import { Like, Repository } from 'typeorm';
import { GetAllUserDto } from './dto/getAllUser.dto';
import { Author } from './author.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author) private authorRepository: Repository<Author>,
  ) {}

  async getAllUsers(getAllUsersDto: GetAllUserDto): Promise<any> {
    try {
      const {
        keyword = '',
        limit = 10,
        page = 1,
        // filter = '',
      } = getAllUsersDto;
      const take = +limit;
      const skip = (page - 1) * limit;

      const [result, total] = await this.authorRepository.findAndCount({
        where: [
          { first_name: Like(`%${keyword}%`) },
          { last_name: Like(`%${keyword}%`) },
        ],
        take: take,
        skip: skip,
      });

      return {
        page,
        page_size: take,
        total_page: Math.ceil(total / take),
        total_item: total,
        result,
      };
    } catch (error) {
        CommonLogger.log({message: `GET_ALL_USERS_SERVICE_ERROR`});
    }
  }
}
