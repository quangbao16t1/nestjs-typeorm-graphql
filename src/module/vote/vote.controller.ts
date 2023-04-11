import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { VoteService } from "./vote.service";

@ApiTags('Votes')
@Controller('votes')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}
}
