import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PhotosService {
  constructor(private prisma: PrismaClient) {}

  async getAllPhotos() {
    let data = await this.prisma.photos.findMany({
      where: {
        photo_status: 1,
      },
      include: {
        users: true,
      },
    });

    return {
      data: data,
      message: 'Get all photos successfully!',
      status: HttpStatus.OK,
      date: new Date(),
    };
  }

  async uploadPhoto(user_id, photo_url, photo_name, description) {
    let data = await this.prisma.photos.create({
      data: {
        user_id,
        url: 'localhost:8080/public/img/' + photo_url,
        photo_name,
        description,
        photo_status: 1,
      },
    });

    return {
      message: 'Upload photo successfully!',
      status: HttpStatus.OK,
      date: new Date(),
    };
  }

  async searchPhotoByName(photo_name) {
    let data = await this.prisma.photos.findMany({
      where: {
        photo_name: {
          contains: photo_name,
        },
      },
      include: {
        users: true,
      },
    });
    if (data.length === 0) {
      return {
        message: 'Not found any photo!',
        status: HttpStatus.BAD_REQUEST,
        date: new Date(),
      };
    } else {
      return {
        data: data,
        message: 'Search photo by name successfully!',
        status: HttpStatus.OK,
        date: new Date(),
      };
    }
  }

  async getPhotoById(photo_id) {
    let data = await this.prisma.photos.findUnique({
      where: {
        photo_id: photo_id,
        photo_status: 1,
      },
      include: {
        users: true,
      },
    });
    if (!data) {
      return {
        message: 'Not found any photo!',
        status: HttpStatus.BAD_REQUEST,
        date: new Date(),
      };
    } else {
      return {
        data: data,
        message: 'Get photo by id successfully!',
        status: HttpStatus.OK,
        date: new Date(),
      };
    }
  }

  async savePhoto(user_id, photo_id) {
    if (this.prisma.photos.findUnique({ where: { photo_id } }) === null) {
      return {
        message: 'Photo not found',
        status: HttpStatus.BAD_REQUEST,
        date: new Date(),
      };
    }
    const time = new Date();
    let data = await this.prisma.saved_photos.create({
      data: {
        user_id,
        photo_id,
        save_date: time,
      },
    });

    return {
      message: 'Save photo successfully!',
      status: HttpStatus.OK,
      date: new Date(),
    };
  }

  async getSavedPhotosByUser(user_id) {
    let data = await this.prisma.saved_photos.findMany({
      where: {
        user_id,
      },
      include: {
        photos: {
          include: {
            users: true,
          },
        },
      },
    });

    if (!data || data.length === 0) {
      return {
        message: 'Not found any photo!',
        status: HttpStatus.BAD_REQUEST,
        date: new Date(),
      };
    } else {
      return {
        data: data,
        message: 'Get saved photos by user successfully!',
        status: HttpStatus.OK,
        date: new Date(),
      };
    }
  }

  async getInfoSavedPhoto(user_id, photo_id) {
    let data = await this.prisma.saved_photos.findUnique({
      where: {
        user_id_photo_id: {
          user_id,
          photo_id,
        },
      },
      include: {
        photos: {
          include: {
            users: true,
          },
        },
      },
    });

    if (!data) {
      return {
        message: 'Photo not saved',
        status: HttpStatus.BAD_REQUEST,
        date: new Date(),
      };
    } else {
      return {
        data: data,
        message: 'Photo saved',
        status: HttpStatus.OK,
        date: new Date(),
      };
    }
  }

  async getPhotosByUser(user_id) {
    let data = await this.prisma.photos.findMany({
      where: {
        user_id,
        photo_status: 1,
      },
      include: {
        users: true,
      },
    });

    if (!data || data.length === 0) {
      return {
        message: 'Not found any photo!',
        status: HttpStatus.BAD_REQUEST,
        date: new Date(),
      };
    } else {
      return {
        data: data,
        message: 'Get photos by user successfully!',
        status: HttpStatus.OK,
        date: new Date(),
      };
    }
  }

  async deletePhoto(photo_id) {
    let data = await this.prisma.photos.update({
      where: {
        photo_id,
      },
      data: { photo_status: 0 },
    });

    if (!data) {
      return {
        message: 'Not found any photo!',
        status: HttpStatus.BAD_REQUEST,
        date: new Date(),
      };
    }
    return {
      message: 'Delete photo successfully!',
      status: HttpStatus.OK,
      date: new Date(),
    };
  }
}
