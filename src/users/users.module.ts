import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MulterModule } from '@nestjs/platform-express';
import { uploadOptions } from 'src/config/upload.config';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MulterModule.register(uploadOptions), AuthModule, JwtModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaClient],
})
export class UsersModule {}
