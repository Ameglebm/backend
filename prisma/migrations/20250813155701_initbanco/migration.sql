-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CLIENTE', 'CORRETOR', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Corretor" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "creci" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "foto" TEXT,
    "statusCreci" BOOLEAN NOT NULL,
    "estado" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "dataVerificacao" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Corretor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "foto" TEXT,
    "estado" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Corretor_userId_key" ON "Corretor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Corretor_cpf_key" ON "Corretor"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_userId_key" ON "Cliente"("userId");

-- AddForeignKey
ALTER TABLE "Corretor" ADD CONSTRAINT "Corretor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
