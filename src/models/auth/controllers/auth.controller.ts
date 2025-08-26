import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  @Get('ping')
  @ApiOperation({ summary: 'Teste de API' })
  @ApiBearerAuth()
  ping() {
    return { message: 'Auth funcionando!' };
  }
}
