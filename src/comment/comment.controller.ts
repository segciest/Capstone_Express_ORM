import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentService } from './comment.service';

@UseGuards(AuthGuard('jwt'))
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('create-comment/:photo_id')
  async createComment(@Body() body, @Req() req: Request, @Param() param) {
    const user_id = req['user'].user_id;
    const { photo_id } = param;
    const photoId = parseInt(photo_id);
    const { content } = body;
    return await this.commentService.createComment(user_id, photoId, content);
  }

  @Get('get-comment/:photo_id')
  async getComment(@Param() param) {
    const { photo_id } = param;
    const photoId = parseInt(photo_id);
    return await this.commentService.getComment(photoId);
  }
}
