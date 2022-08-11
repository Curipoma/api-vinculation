import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth, PublicRoute, User } from '@auth/decorators';
import { AuthService } from '@auth/services';
import { UserEntity } from '@auth/entities';
import {
  LoginDto,
  PasswordChangeDto,
  UpdateUserInformationDto,
  UpdateProfileDto,
} from '@auth/dto';
import { ResponseHttpModel } from '@shared/models';

@ApiTags('Auth')
@Auth()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @PublicRoute()
  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  async login(@Body() payload: LoginDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.authService.login(payload);

    return {
      data: serviceResponse.data,
      message: 'Correct Access',
      title: 'Welcome',
    };
  }

  @ApiOperation({ summary: 'Change Password' })
  @Put(':id/change-password')
  @HttpCode(HttpStatus.CREATED)
  async changePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: PasswordChangeDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.authService.changePassword(id, payload);

    return {
      data: serviceResponse.data,
      message: 'The password was changed',
      title: 'Password Changed',
    };
  }

  @ApiOperation({ summary: 'Find Profile' })
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  async findProfile(@User() user: UserEntity): Promise<ResponseHttpModel> {
    const serviceResponse = await this.authService.findProfile(user.id);

    return {
      data: serviceResponse.data,
      message: `profile`,
      title: `Success`,
    };
  }

  @ApiOperation({ summary: 'Find User Information' })
  @Get('user-information')
  @HttpCode(HttpStatus.CREATED)
  async findUserInformation(
    @User() user: UserEntity,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.authService.findUserInformation(user.id);

    return {
      data: serviceResponse.data,
      message: 'The user information was updated',
      title: 'User Information Updated',
    };
  }

  @ApiOperation({ summary: 'Update Profile' })
  @Put('profile')
  @HttpCode(HttpStatus.CREATED)
  async updateProfile(
    @User() user: UserEntity,
    @Body() payload: UpdateProfileDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.authService.updateProfile(
      user.id,
      payload,
    );

    return {
      data: serviceResponse.data,
      message: 'The profile was updated',
      title: 'Profile Updated',
    };
  }

  @ApiOperation({ summary: 'Update User Information' })
  @Put('user-information')
  @HttpCode(HttpStatus.CREATED)
  async updateUserInformation(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateUserInformationDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.authService.updateUserInformation(
      id,
      payload,
    );

    return {
      data: serviceResponse.data,
      message: 'The user information was updated',
      title: 'User Information Updated',
    };
  }

  @ApiOperation({ summary: 'Refresh Token' })
  @Get('refresh-token')
  @HttpCode(HttpStatus.CREATED)
  refreshToken(@User() user: UserEntity) {
    const serviceResponse = this.authService.refreshToken(user);

    return {
      data: serviceResponse.data,
      message: 'Correct Access',
      title: 'Welcome',
    };
  }
}
