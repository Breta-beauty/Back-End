import { Injectable, NotFoundException } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Salon } from './entities/salon.entity';
import { User } from '../user/entities/user.entity';

import { CreateSalonInput } from './dto/create-salon.input';
import { UpdateSalonInput } from './dto/update-salon.input';
import { FindByInput } from './dto/findBy.input';

@Injectable()
export class SalonService {
  constructor(
    @InjectRepository(Salon) private salonRepo: Repository<Salon>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async create(user_id: string, createSalonInput: CreateSalonInput) {
    const user = await this.userRepo.findOne({
      where: { user_id },
      relations: { profile: true },
    });

    if (!user) throw new NotFoundException(['No se encontró al usuario']);

    const profile = user.profile;

    const newSalon = await this.salonRepo.create(createSalonInput);
    newSalon.owner = profile;

    return this.salonRepo.save(newSalon);
  }

  async findAll() {
    const salons = await this.salonRepo.find({
      relations: { services: true, ratings: true },
    });

    if (!salons) throw new NotFoundException(['No se encontraron salones']);

    return salons;
  }

  async findBy(findByInput: FindByInput) {
    const salons = await this.salonRepo.find({
      relations: { services: true, ratings: true, owner: true },
      where: [
        {
          salon_name: ILike(`%${findByInput.search_input}%`),
        },
        {
          services: { service_name: ILike(`%${findByInput.search_input}%`) },
        },
      ],
      order: { salon_name: 'ASC' },
    });

    if (!salons || salons.length === 0) {
      throw new NotFoundException([
        `No se encontraron resultados similares a: ${findByInput.search_input}`,
      ]);
    }

    return salons;
  }

  async findOne(salon_id: number) {
    const salon = await this.salonRepo.findOne({
      where: { salon_id },
      relations: { services: true, ratings: true, owner: true, address: true },
    });

    if (!salon) throw new NotFoundException(['No se encontró el salón']);

    return salon;
  }

  async update(salon_id: number, updateSalonInput: UpdateSalonInput) {
    const salon = await this.salonRepo.findOneBy({ salon_id });

    if (!salon) throw new NotFoundException(['No se encontró el salón']);

    this.salonRepo.merge(salon, updateSalonInput);

    return this.salonRepo.save(salon);
  }

  async remove(salon_id: number) {
    const salon = await this.salonRepo.findOneBy({ salon_id });

    if (!salon) throw new NotFoundException(['El salón no existe']);

    this.salonRepo.delete(salon_id);
  }
}
