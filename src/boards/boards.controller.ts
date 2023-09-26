import { Controller } from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  //boardsService: BoardsService;

  constructor(private boardsService: BoardsService) {
    //this.boardsService = boardsService;
  }
}
