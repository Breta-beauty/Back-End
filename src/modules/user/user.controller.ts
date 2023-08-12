import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { GoogleOAuthGuard } from 'src/guards/auth/google-oauth.guard';
import { AuthService } from '../authn/auth.service';

@Controller('user')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @Get('google-auth')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth() {
    return { message: 'Google Auth' };
  }

  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Request() req) {
    return this.authService.googleLogin(req);
  }
}
