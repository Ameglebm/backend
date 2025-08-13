# Etapa 1 - Build da aplicação
FROM node:20-alpine AS builder

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia todo o restante do projeto
COPY . .

# Build da aplicação NestJS
RUN npm run build

# Etapa 2 - Imagem para produção
FROM node:20-alpine AS production

# Diretório de trabalho
WORKDIR /app

# Copia apenas as dependências
COPY --from=builder /app/node_modules ./node_modules

# Copia o diretório `dist` gerado pela build
COPY --from=builder /app/dist ./dist

# Copia o prisma client e schema se necessário
COPY --from=builder /app/prisma ./prisma

# Copia package.json e qualquer config necessária
COPY --from=builder /app/package*.json ./

# Gera o Prisma Client na produção
RUN npx prisma generate

# Exponha a porta que sua aplicação usa
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "dist/main"]
