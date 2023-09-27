import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.boardRepository.save(board);
    return board;
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({
      where: { id },
    });

    if (!found) {
      throw new NotFoundException(`발견하지 못함 ${id}`);
    }
    return found;
  }
}
