import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { uploadOptions } from 'src/config/upload.config';
import { UsersService } from './users.service';

@UseGuards(AuthGuard('jwt'))
@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('get-all-user')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('get-user-by-id/:user_id')
  getUserById(@Param() param) {
    const { user_id } = param;
    const userId = parseInt(user_id);
    return this.usersService.getUserById(userId);
  }

  @Post('upload-avatar')
  @UseInterceptors(FileInterceptor('avatar', uploadOptions))
  async upLoadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    if (!file) {
      throw new Error('File not found');
    }
    const user_id = req['user'].user_id;

    await this.usersService.upLoadAvatar(user_id, file.filename);
    return {
      message: 'Upload avatar successfully',
      file,
      status: HttpStatus.OK,
    };
  }

  @Put('update-user')
  async updateUser(@Request() req, @Body() body) {
    const user_id = req['user'].user_id;
    const { full_name, email, password, age } = req.body;

    return this.usersService.updateUser(
      user_id,
      full_name,
      email,
      password,
      age,
    );
  }
}
