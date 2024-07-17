import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaClient) {}

  async createComment(user_id, photo_id, content) {
    if (this.prisma.photos.findUnique({ where: { photo_id } }) === null) {
      return {
        message: 'Photo not found',
        status: HttpStatus.BAD_REQUEST,
        date: new Date(),
      };
    }
    let time = new Date();
    let data = await this.prisma.comments.create({
      data: {
        user_id,
        photo_id,
        content,
        comment_date: time,
        comment_status: 1,
      },
      include: {
        users: true,
        photos: true,
      },
    });

    if (!data) {
      return {
        message: 'Create comment failed',
        status: HttpStatus.BAD_REQUEST,
        date: new Date(),
      };
    }
    return {
      data: data,
      message: 'Create comment successfully!',
      status: HttpStatus.CREATED,
      date: new Date(),
    };
  }

  async getComment(photo_id) {
    if (this.prisma.photos.findUnique({ where: { photo_id } }) === null) {
      return {
        message: 'Photo not found',
        status: HttpStatus.BAD_REQUEST,
        date: new Date(),
      };
    }
    let data = await this.prisma.comments.findMany({
      where: {
        photo_id,
        comment_status: 1,
      },
      include: {
        users: true,
        photos: true,
      },
    });

    if (!data || data.length === 0) {
      return {
        message: 'Get comment failed',
        status: HttpStatus.BAD_REQUEST,
        date: new Date(),
      };
    }
    return {
      data: data,
      message: 'Get comment successfully!',
      status: HttpStatus.OK,
      date: new Date(),
    };
  }
}
