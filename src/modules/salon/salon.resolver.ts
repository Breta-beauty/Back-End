import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SalonService } from './salon.service';
import { Salon } from './entities/salon.entity';
import { CreateSalonInput } from './dto/create-salon.input';
import { UpdateSalonInput } from './dto/update-salon.input';
import { FindByInput } from './dto/findBy.input';

@Resolver(() => Salon)
export class SalonResolver {
  constructor(private readonly salonService: SalonService) {}

  @Mutation(() => Salon)
  createSalon(
    @Args('user_id') user_id: string,
    @Args('createSalonInput') createSalonInput: CreateSalonInput,
  ) {
    return this.salonService.create(user_id, createSalonInput);
  }

  @Query(() => [Salon], { name: 'salon' })
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
  updateSalon(@Args('updateSalonInput') updateSalonInput: UpdateSalonInput) {
    return this.salonService.update(updateSalonInput.id, updateSalonInput);
  }

  @Mutation(() => Salon)
  removeSalon(@Args('salon_id') salon_id: number) {
    return this.salonService.remove(salon_id);
  }
}
