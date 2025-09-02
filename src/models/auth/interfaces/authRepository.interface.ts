import { User } from "generated/prisma";
import { Role } from "../../common/enums/role.enum";

export interface IAuthRepository {
  findByEmail(email: string): Promise<User | null>;
  createUser(data: {
    email: string;
    nome: string;
    dataNascimento: Date;
    role: Role;
  }): Promise<User>;
  updateUserRole(userId: string, role: Role): Promise<User>;
}
