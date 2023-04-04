import {
  Controller,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import RepoService from './repo.service';

@ApiTags('Repos')
@Controller('repos')
export class RepoController {
  constructor(private readonly repoService: RepoService) {}

}
