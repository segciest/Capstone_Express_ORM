import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaClient) {}

  async getAllUsers() {
    let users = await this.prisma.users.findMany();
    if (users) {
      return {
        data: users,
        message: 'Get all users successfully!',
        status: HttpStatus.OK,
        date: new Date(),
      };
    }
  }

  async getUserById(user_id) {
    let user = await this.prisma.users.findUnique({
      where: { user_id: user_id },
    });
    if (!user) {
      return {
        message: 'User not found',
        status: HttpStatus.BAD_REQUEST,
        date: new Date(),
      };
    }
    return {
      data: user,
      message: 'Get user by id successfully!',
      status: HttpStatus.OK,
      date: new Date(),
    };
  }

  async upLoadAvatar(user_id, fileName) {
    await this.prisma.users.update({
      where: { user_id: user_id },
      data: { avatar: fileName },
    });
  }

  async updateUser(user_id, full_name, email, password, age) {
    try {
      await this.prisma.users.update({
        where: { user_id: user_id },
        data: { full_name, email, password, age },
      });
      return {
        message: 'Update user successfully',
        status: HttpStatus.OK,
        date: new Date(),
      };
    } catch (error) {
      return {
        message: 'Update user failed',
        status: HttpStatus.BAD_REQUEST,
        date: new Date(),
      };
    }
  }
}
