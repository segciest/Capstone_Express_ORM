import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { uploadOptions } from 'src/config/upload.config';
import { PhotosService } from './photos.service';

@UseGuards(AuthGuard('jwt'))
@ApiTags('Photos')
@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Get('get-all-photos')
  async getAllPhotos() {
    return await this.photosService.getAllPhotos();
  }

  @Post('upload-photo')
  @UseInterceptors(FileInterceptor('photos', uploadOptions))
  async uploadPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @Body() body,
  ) {
    if (!file) {
      throw new Error('File not found');
    }
    const user_id = req['user'].user_id;

    const photo_url = file.filename;

    const { photo_name, description } = body;

    return await this.photosService.uploadPhoto(
      user_id,
      photo_url,
      photo_name,
      description,
    );
  }

  @Get('search-photo-by-name/:photo_name')
  async searchPhotoByName(@Param() param) {
    const { photo_name } = param;

    return await this.photosService.searchPhotoByName(photo_name);
  }

  @Get('get-photo-by-id/:photo_id')
  async getPhotoById(@Param() param) {
    const { photo_id } = param;

    const photoId = parseInt(photo_id);

    return await this.photosService.getPhotoById(photoId);
  }

  @Post('save-photo/:photo_id')
  async savePhoto(@Req() req: Request, @Param() param) {
    const user_id = req['user'].user_id;

    const { photo_id } = param;

    const photoId = parseInt(photo_id);

    return await this.photosService.savePhoto(user_id, photoId);
  }

  @Get('get-saved-photos-by-user')
  async getSavedPhotosByUser(@Req() req: Request) {
    const user_id = req['user'].user_id;
    const userId = parseInt(user_id);
    return await this.photosService.getSavedPhotosByUser(userId);
  }

  @Get('get-info-saved-photo/:photo_id')
  async getInfoSavedPhoto(@Req() req: Request, @Param() param) {
    const user_id = req['user'].user_id;

    const { photo_id } = param;

    const photoId = parseInt(photo_id);

    return await this.photosService.getInfoSavedPhoto(user_id, photoId);
  }

  @Get('get-photos-by-user')
  async getPhotosByUser(@Req() req: Request) {
    const user_id = req['user'].user_id;
    const userId = parseInt(user_id);
    return await this.photosService.getPhotosByUser(userId);
  }

  @Put('delete-photo/:photo_id')
  async deletePhoto(@Param() param) {
    const { photo_id } = param;

    const photoId = parseInt(photo_id);

    return await this.photosService.deletePhoto(photoId);
  }
}
