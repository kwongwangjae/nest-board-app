import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { TypeOrmExModule } from 'src/module/ typeorm-ex.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([UserRepository])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
