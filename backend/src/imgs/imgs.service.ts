import { Injectable } from '@nestjs/common';
import { CreateImgDto } from './dto/create-img.dto';
import { UpdateImgDto } from './dto/update-img.dto';
import { Imgs } from './entities/img.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ImgsService {
  constructor(
    @InjectRepository(Imgs)
    private imgsRepository: Repository<Imgs>,

  ) {

  }
  testCresteArray() {
    const dto = {
      imgs: [1, 2, 3, 4, 5]
    }
    try {
      for (const item of dto.imgs) {
        console.log(item);
      }
    } catch (error) {
      throw error
    }


  }
}
