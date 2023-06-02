import { Injectable } from '@nestjs/common';
import { CreateSalonInput } from './dto/create-salon.input';
import { UpdateSalonInput } from './dto/update-salon.input';

@Injectable()
export class SalonService {
  create(createSalonInput: CreateSalonInput) {
    return 'This action adds a new salon';
  }

  findAll() {
    return `This action returns all salon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} salon`;
  }

  update(id: number, updateSalonInput: UpdateSalonInput) {
    return `This action updates a #${id} salon`;
  }

  remove(id: number) {
    return `This action removes a #${id} salon`;
  }
}
