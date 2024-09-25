import { PolicyHandler } from '../../model/policy-handler.interface';
import { User } from '../../model/user';
import { Action, AppAbility } from '../ability/ability.factory';

export class ReadUserPolicyHandler implements PolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, User);
  }
}
