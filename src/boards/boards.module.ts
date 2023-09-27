import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/module/ typeorm-ex.module';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardRepository } from './board.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([BoardRepository])],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
