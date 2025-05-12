import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // console.log(request.headers);

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verify(token);
      // console.log(process.env.JWT_SECRET, payload);
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      // console.log(payload, '---authGuradPayload');

      request['user'] = {
        id: payload.id,
        username: payload.username,
        role: payload.role,
      };
    } catch (err: any) {
      console.log(err);

      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    // console.log(type === 'Bearer', type, token);

    return type === 'Bearer' ? token : undefined;
  }
}
