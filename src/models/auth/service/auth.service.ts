import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    googleLogin(req: any) {
      throw new Error('Method not implemented.');
    }
    constructor(private jwtService: JwtService) {
    }
}