import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
    origin: '*', // você pode trocar para ['http://localhost:5173'] se tiver frontend separado
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Validations automáticas
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // remove propriedades não definidas no DTO
    forbidNonWhitelisted: true, // lança erro se enviar propriedades extras
    transform: true, // converte tipos automaticamente
  }));

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
  const port = process.env.PORT ?? 3333;
  await app.listen(port);
  console.log(`🚀 Swagger rodando em: http://localhost:${port}/api`);
}
bootstrap();
