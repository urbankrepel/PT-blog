import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest();
    try {
      const jwt = req.cookies['jwt'] || undefined;
      return this.jwtService.verify(jwt);
    } catch (e) {
      return false;
    }
  }
}
