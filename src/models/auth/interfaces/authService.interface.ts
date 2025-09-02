import { User, Role } from "@prisma/client"; 

export interface IAuthService {
  validateOrCreateUserFromGoogle(googleUser: { email: string; name: string }): Promise<User>;
  signToken(user: { id: string; email: string; role: Role; nome: string }): string;
  chooseRole(userId: string, role: Role): Promise<{
    user: User;
    token: {
      expires_in: string;
      token_type: string;
      access_token: string;
    };
  }>;
  googleLogin(googleUser: { email: string; name: string }): Promise<any>;
}
