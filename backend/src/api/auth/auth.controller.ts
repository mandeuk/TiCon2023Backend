// ** Module
import {
    Body,
    Controller,
    Get,
    Post,
    Res,
    UseGuards,
    Query,
    Delete,
    Put,
    Session,
    HttpStatus
  } from '@nestjs/common'
  import { ApiOperation, ApiTags } from '@nestjs/swagger'
  import { Response } from 'express'
  
  // ** Dto
  import { LogoutDto } from './dto/logout.dto'
  import { RegisterUserDto } from './dto/register-user.dto'
  import { SignInWithGoogleDto } from './dto/sign-in-with-google.dto'

  
  // ** Decorator
  import { ApiFiles } from 'src/common/decorator/api-files.decorator'
  
  // ** Guard
  import { SystemAdminGuard } from 'src/common/guard/system-admin.guard'
  import { AdminGuard } from 'src/common/guard/admin.guard'
  
  // ** Service
  import { AuthService } from './auth.service'
import { GetUserDto } from './dto/get-user.dto'


  
  // ANCHOR admin controller
  @ApiTags('auth')
  @Controller('api/auth')
  export class AuthController {
    constructor(
      private authService: AuthService
    ) {}
  
    // ANCHOR check system admin
    @Get('getUser')
    @ApiOperation({ summary: '유저 정보 확인' })
    async getUser(
        @Res() res: Response, 
        @Session() session: any,
        @Query() dto: GetUserDto
    ) {
      dto.id = session.userId
      const result = await this.authService.getUser(dto)
      res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: result.message,
        data: result.data
      })
    }
  
    // ANCHOR create system admin
    @Post('registerUser')
    @ApiOperation({ summary: '유저 회원가입' })
    async registerUser(
      @Res() res: Response,
      @Body() dto: RegisterUserDto
    ) {
      const result = await this.authService.registerUser(dto)
      res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: result.message,
        data: result.data
      })
    }
  
    // ANCHOR login
    @Post('signInWithGoogle')
    @ApiOperation({ summary: '구글 로그인' })
    async signInWithGoogle(
      @Res() res: Response,
      @Body() dto: SignInWithGoogleDto,
      @Session() session: any
    ) {
      const result = await this.authService.signInWithGoogle(dto)
      console.log(result)
      session.userId = result.data.id
      //session.role = result.data.role
  
      res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: result.message,
        data: result.data
      })
    }
  
    // ANCHOR logout
    @Delete('logout')
    @ApiOperation({ summary: '로그아웃 (본인)' })
    async logout(
      @Res() res: Response,
      @Session() session: any,
      @Query() dto: LogoutDto
    ) {
      dto.userId = session.userId
      const result = await this.authService.logout(dto)
  
      session.destroy()
  
      res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: result.message,
        data: result.data
      })
    }
  }