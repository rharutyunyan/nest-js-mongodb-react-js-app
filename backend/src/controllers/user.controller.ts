import {
  Controller,
  Get,
  UseGuards,
  Req,
  Param,
  Put,
  Post,
  Body,
  UnauthorizedException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from '../services';
import { AccessControlGuard } from '../common/auth';
import { UpdateUserRequest } from '../request-models';

@UseGuards(AccessControlGuard)
@Controller('/api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async getUser(@Req() req, @Param() { id }): Promise<any> {
    return await this.userService.getUserById(id);
  }

  @Put('/:id')
  async updateUser(
    @Req() req,
    @Param() { id },
    @Body() data: UpdateUserRequest,
  ): Promise<any> {
    if (req.user.userId !== id) {
      throw new UnauthorizedException({ message: 'Not Authorized' });
    }
    return await this.userService.updateUser(id, data);
  }

  @Post('/:id/image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadedFile(@Req() req, @UploadedFile() file, @Param() { id }) {
    if (req.user.userId !== id) {
      throw new UnauthorizedException({ message: 'Not Authorized' });
    }
    const image = file.filename;
    return await this.userService.updateUser(id, { image });
  }
}
