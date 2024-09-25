import { AppAbility } from '../modules/ability/ability.factory';

export interface PolicyHandler {
  handle(ability: AppAbility): boolean;
}

export type PolicyHandlerCallback = (ability: AppAbility) => boolean;
