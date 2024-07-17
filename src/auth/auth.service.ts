import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private prisma: PrismaClient,
  ) {}

  generateRandomString = (length) => {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  async login(model: any) {
    let { email, password } = model;
    const user = await this.prisma.users.findFirst({
      where: { email: email },
    });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        let key = this.generateRandomString(6);
        const payload = { user_id: user.user_id, key };
        const accessToken = this.jwtService.sign(payload, {
          expiresIn: '5m',
          algorithm: 'HS256',
          secret: process.env.JWT_SECRET,
        });

        const refreshToken = this.jwtService.sign(
          { user_id: user.user_id, key },
          {
            expiresIn: '30d',
            algorithm: 'HS256',
            secret: process.env.JWT_SECRET_REFRESH,
          },
        );

        user.refresh_token = refreshToken;

        await this.prisma.users.update({
          data: user,
          where: { user_id: user.user_id },
        });

        return {
          data: accessToken,
          message: 'Login successfully!',
          status: HttpStatus.OK,
          date: new Date(),
        };
      } else {
        return {
          data: '',
          message: 'Password is incorrect!',
          status: HttpStatus.BAD_REQUEST,
          date: new Date(),
        };
      }
    } else {
      return {
        data: '',
        message: 'Email is not found!',
        status: HttpStatus.NOT_FOUND,
        date: new Date(),
      };
    }
  }

  async signUp(model: any) {
    let { full_name, email, password, age } = model;

    const user = await this.prisma.users.findFirst({
      where: { email: email },
    });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = bcrypt.hashSync(password.toString(), 10);
    let newData = {
      full_name,
      email,
      password: hashedPassword,
      age,
      avatar: '',
      refresh_token: '',
    };

    await this.prisma.users.create({
      data: newData,
    });
    return {
      message: 'Sign up successfully!',
      status: HttpStatus.CREATED,
      date: new Date(),
    };
  }

  async resetToken(token: string) {
    try {
      // Check token
      let errToken;
      try {
        errToken = await this.jwtService.verifyAsync(token, {
          secret: process.env.JWT_SECRET,
        });
      } catch (error) {
        errToken = error;
      }
      if (errToken == null && errToken.name == 'TokenExpiredError') {
        return {
          data: '',
          message: 'Not Authorized',
          status: HttpStatus.UNAUTHORIZED,
          date: new Date(),
        };
      }

      const decoded = this.jwtService.decode(token);
      if (!decoded || !decoded.user_id) {
        return {
          data: '',
          message: 'Invalid token data',
          status: HttpStatus.UNAUTHORIZED,
          date: new Date(),
        };
      }

      const getUser = await this.prisma.users.findFirst({
        where: { user_id: decoded.user_id },
      });
      if (!getUser) {
        return {
          data: '',
          message: 'User not found',
          status: HttpStatus.UNAUTHORIZED,
          date: new Date(),
        };
      }

      const tokenRef = this.jwtService.decode(getUser.refresh_token);

      if (
        this.jwtService.verifyAsync(getUser.refresh_token, {
          secret: process.env.JWT_SECRET_REFRESH,
        }) == null
      ) {
        return {
          data: '',
          message: 'Not Authorized',
          status: HttpStatus.UNAUTHORIZED,
          date: new Date(),
        };
      }

      // Create a new token
      const tokenNew = this.jwtService.sign({
        user_id: getUser.user_id,
        key: tokenRef.key,
      });

      return {
        data: tokenNew,
        message: 'Token refreshed',
        status: HttpStatus.OK,
        date: new Date(),
      };
    } catch (error) {
      return {
        data: '',
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        date: new Date(),
      };
    }
  }
}
