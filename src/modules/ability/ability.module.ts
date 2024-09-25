import { Module } from '@nestjs/common';
import { AbilityFactory } from './ability.factory';
import { PoliciesGuard } from '../../guards/policies.guard';

@Module({
  providers: [PoliciesGuard, AbilityFactory],
  exports: [PoliciesGuard, AbilityFactory],
})
export class AbilityModule {}
