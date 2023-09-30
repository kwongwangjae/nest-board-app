import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  // async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
  //   const { title, description } = createBoardDto;

  //   const board = this.boardRepository.create({
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   });

  //   await this.boardRepository.save(board);
  //   return board;
  // }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        `보드에 대한 아이디 값을 발견하지 못했습니다 ${id}`,
      );
    }

    console.log('result', result);
    //결과: result DeleteResult { raw: [], affected: 1 } 혹시 없을 수도 있으니까 에러핸들러를 함
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
