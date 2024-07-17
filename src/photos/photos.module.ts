import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { PrismaClient } from '@prisma/client';
import { MulterModule } from '@nestjs/platform-express';
import { uploadOptions } from 'src/config/upload.config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [MulterModule.register(uploadOptions), JwtModule, AuthModule],
  controllers: [PhotosController],
  providers: [PhotosService, PrismaClient],
})
export class PhotosModule {}
