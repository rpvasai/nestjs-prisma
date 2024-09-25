import { Role } from '../../../model/user';

export interface JwtPayload {
  email: string;
  sub: string; // userId
  role: Role;
}
