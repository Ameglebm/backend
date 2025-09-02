import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { prisma } from '../../../lib/prisma';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const { name, emails } = profile;

    let user = await prisma.user.findUnique({ where: { email: emails[0].value } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: emails[0].value,
          nome: `${name.givenName} ${name.familyName}`,
          role: 'ADMIN', // ou CLIENTE
          dataNascimento: new Date('2000-01-01'), // obrigatório no seu schema
        },
      });
    }

    return user;
  }
}
