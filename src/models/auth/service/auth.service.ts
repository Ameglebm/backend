import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { prisma } from '../../../lib/prisma';
import { Role } from '../../common/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) { }

  // Validar usuário do Google ou criar caso não exista
  async validateOrCreateUserFromGoogle(googleUser: { email: string; name: string }) {
    let user = await prisma.user.findUnique({
      where: { email: googleUser.email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: googleUser.email,
          nome: googleUser.name,
          dataNascimento: new Date('1970-01-01'),
          role: Role.ADMIN,
        },
      });
    }

    return user;
  }

  // Gerar token JWT
  signToken(user: { id: string; email: string; role: Role; nome: string }) {
    const payload = { sub: user.id, email: user.email, role: user.role, nome: user.nome };
    return this.jwt.sign(payload);
  }

  // Escolher papel (CLIENTE ou CORRETOR) após login
  async chooseRole(userId: string, role: Role) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    if (role === Role.CLIENTE) {
      await prisma.cliente.upsert({
        where: { userId },
        update: {},
        create: {
          userId,
          estado: '', // preenchido depois na verificação
          cidade: '', // preenchido depois na verificação
        },
      });
    }

    if (role === Role.CORRETOR) {
      await prisma.corretor.upsert({
        where: { userId },
        update: {},
        create: {
          userId,
          creci: '', // preenchido depois na verificação
          cpf: '', // preenchido depois na verificação
          statusCreci: false,
          estado: '',
          cidade: '',
        },
      });
    }

    // gerar novo token já com role atualizado
    const token = this.signToken(user);
    return {
      user,
      token: {
        expires_in: '8h',
        token_type: 'Bearer',
        access_token: token,
      },
    };
  }

  // Login com Google e retorno do token JWT
  async googleLogin(googleUser: { email: string; name: string }) {
    const user = await this.validateOrCreateUserFromGoogle(googleUser);
    const token = this.signToken(user);
    return {
      access_token: token,
      user,
      token: {
        expires_in: '8h',
        token_type: 'Bearer',
        access_token: token,
      },
    };
  }
}
