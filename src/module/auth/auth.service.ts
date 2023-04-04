import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '../user/author.entity';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { HttpExceptionFilter } from 'src/share/filter/http-exception.filter';
import { JwtService } from '@nestjs/jwt';
import { jwt_config } from 'src/config/constant.config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Author) private authRepository: Repository<Author>,
    private jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto): Promise<any> {
    try {
      const { email, password, first_name, last_name } = registerDto;
      const user = await this.authRepository.findOne({ where: { email } });

      if (user) throw new Error('User already exists!');

      const hashPassword = await bcrypt.hashSync(password, 12);

      const newUser = await this.authRepository.create({
        email,
        password: hashPassword,
        first_name,
        last_name,
      });

      const result = await this.authRepository.save(newUser);

      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async login(loginDto: LoginDto): Promise<any> {
    try {
      const { email, password } = loginDto;
      const user = await this.authRepository.findOne({ where: { email } });

      if (!user) throw new HttpExceptionFilter();

      if (!bcrypt.compareSync(password, user.password))
        throw new HttpExceptionFilter();

      const token = await this.jwtService.signAsync({ sub: user.id }, {
        expiresIn: jwt_config.EXPIRES_IN,
        secret: jwt_config.SECRET
      });

      return {
        user,
        token,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
