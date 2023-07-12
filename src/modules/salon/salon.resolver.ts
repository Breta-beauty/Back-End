import { Salon } from './entities/salon.entity';

import { SalonService } from './salon.service';

import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';

import { FindByInput } from './dto/findBy.input';
import { CreateSalonInput } from './dto/create-salon.input';
import { UpdateSalonInput } from './dto/update-salon.input';

@Resolver(() => Salon)
export class SalonResolver {
  constructor(private readonly salonService: SalonService) {}

  @Mutation(() => Salon)
  createSalon(
    @Args('user_id', { type: () => ID }) user_id: string,
    @Args('createSalonInput') createSalonInput: CreateSalonInput,
  ) {
    return this.salonService.create(user_id, createSalonInput);
  }

  @Query(() => [Salon], { name: 'salons' })
  findAll() {
    return this.salonService.findAll();
  }

  @Query(() => [Salon], { name: 'findSalonsBy' })
  findBy(@Args('findByInput') findByInput: FindByInput) {
    return this.salonService.findBy(findByInput);
  }

  @Query(() => Salon, { name: 'salon' })
  findOne(@Args('salon_id', { type: () => Int }) salon_id: number) {
    return this.salonService.findOne(salon_id);
  }

  @Mutation(() => Salon)
  updateSalon(
    @Args('salon_id', { type: () => ID }) salon_id: number,
    @Args('updateSalonInput') updateSalonInput: UpdateSalonInput,
  ) {
    return this.salonService.update(salon_id, updateSalonInput);
  }

  @Mutation(() => Salon)
  removeSalon(@Args('salon_id', { type: () => ID }) salon_id: number) {
    return this.salonService.remove(salon_id);
  }
}
