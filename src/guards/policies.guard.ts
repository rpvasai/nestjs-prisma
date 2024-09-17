import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AbilityFactory, AppAbility } from '../ability/ability.factory';
import { CHECK_POLICIES_KEY } from '../decorator/check-policies.decorator';
import {
  PolicyHandler,
  PolicyHandlerCallback,
} from '../model/policy-handler.interface';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: AbilityFactory,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const handlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const { user } = context.switchToHttp().getRequest();

    // const ability = this.caslAbilityFactory.defineAbility({
    //   email: '',
    //   firstName: '',
    //   id: '',
    //   lastName: '',
    //   password: '',
    //   role: Role.USER,
    // });
    const ability = this.caslAbilityFactory.defineAbility(user);

    return handlers.every((handler) =>
      this.execPolicyHandler(handler, ability),
    );
  }
  //
  private execPolicyHandler(
    handler: PolicyHandler | PolicyHandlerCallback,
    ability: AppAbility,
  ): boolean {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
