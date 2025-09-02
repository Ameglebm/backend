import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Login com Google' })
  @ApiResponse({
    status: 302,
    description: 'Redireciona para o Google para autenticação',
    content: {
      'application/json': {
        example: {
          url: 'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=profile email',
          message: 'Redirecionando para o Google para autenticação',
          statusCode: 302,
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
    content: {
      'application/json': {
        example: {
          statusCode: 401,
          message: 'Não autorizado',
          error: 'Unauthorized',
        },
      },
    },
  })
  async googleAuth() {
    // Não precisa implementar nada aqui,
    // o Passport vai redirecionar automaticamente para o Google
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Callback do Google após autenticação' })
  @ApiResponse({
    status: 200,
    description: 'Usuário autenticado com sucesso',
    content: {
      'application/json': {
        example: {
          access_token: 'jwt-token',
          user: {
            id: 'user-id',
            email: 'exemplo@exemplo.com',
            nome: 'Nome do Usuário',
            role: 'ADMIN',
            createdAt: '2023-10-01T00:00:00.000Z',
            updatedAt: '2023-10-01T00:00:00.000Z',
          },
          token: {
            expires_in: '8h',
            token_type: 'Bearer',
            access_token: 'jwt-token',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
    content: {
      'application/json': {
        example: {
          statusCode: 401,
          message: 'Não autorizado',
          error: 'Unauthorized',
        },
      },
    },
  })
  async googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req.user);
  }
}
