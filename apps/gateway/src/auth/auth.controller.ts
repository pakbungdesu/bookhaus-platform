import { 
  Controller, 
  Post, 
  Body, 
  HttpCode, 
  HttpStatus, 
  Get, 
  Res, 
  Inject} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Response } from 'express';
import { lastValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private client: ClientProxy,
  ) {}

  @Get('profile')
  async getProfile(@Res() res: Response) {
    try {
      const user = await lastValueFrom(this.client.send({ cmd: 'auth_profile' }, {}));
      return res.json(user);
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: any, @Res() res: Response) {
    try {
      // loginDto now contains { email, password, role }
      const result = await lastValueFrom(
        this.client.send({ cmd: 'auth_login' }, loginDto)
      );

      if (!result || !result.access_token) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ 
          success: false, 
          message: 'Invalid Credentials' 
        });
      }

      // Check if the user trying to log in matches the required role (Optional safety check)
      // if (loginDto.role === 'employee' && result.user.DTYPE !== 'Employee') { ... }

      res.cookie('access_token', result.access_token, {
        httpOnly: true,
        secure: false, // Set to true in production
        maxAge: 3600000, 
      });

      return res.status(HttpStatus.OK).json({
        success: true,
        user: result.user, 
        message: 'Login successful'
      });

    } catch (error) {
      console.error('Login Error:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
        success: false, 
        message: 'Internal Server Error' 
      });
    }
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('access_token');
    return res.redirect('/');
  }

  @Post('register/cust')
  async registerCustomer(@Body() dto: any, @Res() res: Response) {
    try {
      await lastValueFrom(
        this.client.send({ cmd: 'register_customer' }, dto)
      );
      return res.redirect('/auth/login/cust?success=Registration successful');
    } catch (err) {
      return res.redirect('/auth/register/cust?error=Registration failed.');
    }
    
  }

  @Post('register/emp')
  async registerEmployee(@Body() dto: any, @Res() res: Response) {
    try {
      await lastValueFrom(
        this.client.send({ cmd: 'register_employee' }, dto)
      );
      return res.redirect('/auth/login/emp?success=Staff registered');
    } catch (err) {
      return res.redirect('/auth/register/emp?error=Registration failed.');
    }
  }
}