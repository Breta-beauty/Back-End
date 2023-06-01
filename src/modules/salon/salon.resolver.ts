import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SalonService } from './salon.service';
import { Salon } from './entities/salon.entity';
import { CreateSalonInput } from './dto/create-salon.input';
import { UpdateSalonInput } from './dto/update-salon.input';

@Resolver(() => Salon)
export class SalonResolver {
  constructor(private readonly salonService: SalonService) {}

  @Mutation(() => Salon)
  createSalon(@Args('createSalonInput') createSalonInput: CreateSalonInput) {
    return this.salonService.create(createSalonInput);
  }

  @Query(() => [Salon], { name: 'salon' })
  findAll() {
    return this.salonService.findAll();
  }

  @Query(() => Salon, { name: 'salon' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.salonService.findOne(id);
  }

  @Mutation(() => Salon)
  updateSalon(
    @Args('salon_id') salon_id: number,
    @Args('updateSalonInput') updateSalonInput: UpdateSalonInput,
  ) {
    return this.salonService.update(salon_id, updateSalonInput);
  }

  @Mutation(() => Salon)
  removeSalon(@Args('salon_id') salon_id: number) {
    return this.salonService.remove(salon_id);
  }
}
