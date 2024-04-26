import { Module } from '@nestjs/common';
import { ImgsService } from './imgs.service';
import { ImgsController } from './imgs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Imgs } from './entities/img.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Imgs
    ]),
  ],
  controllers: [ImgsController],
  providers: [ImgsService]
})
export class ImgsModule { }
