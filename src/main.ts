import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('ImobiFácil API')
    .setDescription('API para gerenciamento de usuários, corretores e imóveis')
    .setVersion('1.0')
    .addBearerAuth() // para autenticação JWT
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Inicializa a aplicação
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Swagger rodando em: http://localhost:${port}/api`);
}
bootstrap();
