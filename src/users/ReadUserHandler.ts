import { User } from '../model/user';
import { Action, AppAbility } from '../ability/ability.factory';
import { PolicyHandler } from '../guards/policy-handler.interface';

export class ReadUserPolicyHandler implements PolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, User);
  }
}
