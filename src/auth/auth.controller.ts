import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-auth.dto';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.auth';

import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async create(
    @Body() createAuthDto: RegisterDto,
    @Req() req: any,
    @Res() res: Response,
  ) {
    try {
      const user = await this.authService.create(createAuthDto);
      user.password = null;
      res.status(HttpStatus.CREATED).json({ status: 'Succes', data: user });
    } catch (error) {
      console.log(error);

      if (error.code == 23505)
        res.status(HttpStatus.BAD_REQUEST).json({
          status: 'Failed',
          message: "Username va  email unikal bo'lishi kerak",
        });

      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ status: 'Failed', message: error.message });
    }
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    console.log(loginDto, '--contr');

    const { user, token, refreshToken } =
      await this.authService.login(loginDto);
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 3600 * 24 * 10,
    });
    res.status(HttpStatus.OK).json({ status: 'Succes', data: { user, token } });
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('me')
  getMyData(@Req() req: any) {
    return req.user;
  }
  @Get('refresh')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const token = req?.cookies['jwt'];
    const data: any = await this.authService.refresh(token);
    res.status(HttpStatus.OK).json({
      status: 'Succes',
      data: { user: data.user, token: data.access },
    });
  }
  @Get('lougout')
  async logout(@Req() req: Request, @Res() res: Response) {
    const token = req?.cookies['jwt'];
    // res.cookie('jwt', '');
    res.clearCookie('jwt');
    res.send('Yaxshi');
  }
}
