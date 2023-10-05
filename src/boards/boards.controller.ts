import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { BoardStatus } from './board-status.enum';

@Controller('boards')
export class BoardsController {
  constructor(private boardservice: BoardsService) {}

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardservice.getBoardById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() CreateBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardservice.createBoard(CreateBoardDto);
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id): Promise<void> {
    return this.boardservice.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardservice.updateBoardStatus(id, status);
  }

  @Get()
  getAllTask(): Promise<Board[]> {
    return this.boardservice.getAllBoards();
  }
}
