import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../models/common/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {} // readonly pois não será reatribuído

  canActivate(context: ExecutionContext): boolean {
    // Pega os roles definidos nos endpoints
    const requiredRoles = this.reflector.get<Role[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) return true; // se não houver roles, libera acesso

    const request = context.switchToHttp().getRequest();
    const user = request.user as { role: Role }; // garante tipagem do user

    if (!user) throw new ForbiddenException('Usuário não autenticado');

    const hasRole = requiredRoles.includes(user.role);
    if (!hasRole) throw new ForbiddenException('Usuário não tem permissão');

    return true; // usuário autorizado
  }
}
