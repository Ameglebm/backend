import { Injectable } from "@nestjs/common";
import { prisma } from "../../../lib/prisma";
import { Role } from "@prisma/client";
import { IAuthRepository } from "../interfaces/authRepository.interface";

@Injectable()
export class AuthRepository implements IAuthRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async createUser(data: { email: string; nome: string; dataNascimento: Date; role: Role }) {
    return prisma.user.create({ data });
  }

  async updateUserRole(userId: string, role: Role) {
    return prisma.user.update({
      where: { id: userId },
      data: { role },
    });
  }
}
