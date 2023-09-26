import { Controller, Get } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.model';

@Controller('boards')
export class BoardsController {
  //boardsService: BoardsService;

  constructor(private boardsService: BoardsService) {
    //this.boardsService = boardsService;
  }
  @Get('/')
  getAllBoard(): Board[] {
    return this.boardsService.getAllBoards();
  }
}
