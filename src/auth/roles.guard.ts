import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/users/roles.decorator';
import { UserRole } from 'src/users/user-role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      console.log('roless');

      const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRoles) {
        return true;
      }
      const { user } = context.switchToHttp().getRequest();
      console.log(user, requiredRoles, '_----roleGurard');
      if (!requiredRoles.includes(user.role)) {
        throw new UnauthorizedException(
          'Sizga tegishli rote emas: ' + requiredRoles.join(','),
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      //   console.log(error);

      throw new UnauthorizedException(error.message);
    }

    return true;
  }
}
