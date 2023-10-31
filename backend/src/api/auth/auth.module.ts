// ** Module
import { Module } from '@nestjs/common'

// ** Controller
import { AuthController } from './auth.controller'

// ** Service
import { AuthService } from './auth.service'
import { GlobalService } from '../global/global.service'

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, GlobalService]
})
export class AuthModule {}
