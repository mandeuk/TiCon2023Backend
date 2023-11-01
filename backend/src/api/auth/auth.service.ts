// ** Module
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { DataSource, IsNull } from 'typeorm'

// ** Dto
import { GetUserDto } from './dto/get-user.dto'
import { SignInWithGoogleDto } from './dto/sign-in-with-google.dto'
import { DeleteSampleDto } from './dto/delete-sample.dto'
import { LogoutDto } from './dto/logout.dto'

// ** Util
import { OAuth2Client } from 'google-auth-library'

// ** Interface
import { CommonResult } from 'src/common/interface'
import { RegisterUserDto } from './dto/register-user.dto'
import { User } from 'src/entities/user.entity'

@Injectable()
export class AuthService {
  constructor(
    @Inject('DATA_SOURCE')
    private datasource: DataSource
  ) {}

  // ANCHOR get user
  async getUser(dto: GetUserDto): Promise<CommonResult> {
    let message = null
    let data = null

    await this.datasource.transaction(async (transactionalEntityManager) => {
      try {
        if (!dto.id){
          throw new HttpException('No session', HttpStatus.UNAUTHORIZED)
        }

        // TODO 코드를 작성하십시오.
        const user = await transactionalEntityManager
          .getRepository(User)
          .findOne({
            where: {
              id: parseInt(dto.id ?? "0"),
              deletedAt: IsNull()
            }
          })
        if (!user) {
          throw new HttpException('Not registered account', HttpStatus.FORBIDDEN)
        }

        // Return
        message = '유저 정보 불러오기 성공'
        data = user
      } catch (error) {
        throw new HttpException(error.message, error.status)
      }
    })

    return {
      message: message,
      data: data
    }
  }

  // ANCHOR signInWithGoogle
  async signInWithGoogle(dto: SignInWithGoogleDto): Promise<CommonResult> {
    let message = null
    let data = null

    await this.datasource.transaction(async (transactionalEntityManager) => {
      try {
        let userId

        if (dto.idToken) {
          // create OAuth2Client object
          const client = new OAuth2Client('558581304427-a5ihoofmafk41ton2njfudtirq1kha5l.apps.googleusercontent.com')

          // verify IdToken
          let ticket
          try {
            ticket = await client.verifyIdToken({
              idToken: dto.idToken
            })
          } catch (e) {
            // return 401 response
            throw new HttpException(e.message, HttpStatus.UNAUTHORIZED)
          }

          // get payload
          const payload = ticket.getPayload()
          userId = payload.sub
        } else {
          throw new HttpException('잘못 된 접근입니다.', HttpStatus.BAD_REQUEST)
        }

        if (!userId) {
          throw new HttpException('잘못 된 접근입니다.', HttpStatus.BAD_REQUEST)
        }

        // 중복체크
        const user = await transactionalEntityManager
          .getRepository(User)
          .findOne({
            where: {
              signType: 'google',
              account: userId,
              deletedAt: IsNull()
            }
          })
        if (!user) {
          throw new HttpException('This account is not registered', HttpStatus.FORBIDDEN)
        }

        // Return
        message = '로그인 성공'
        data = user
      } catch (error) {
        console.log("catch error")
        throw new HttpException(error.message, error.status)
      }
    })

    return {
      message: message,
      data: data
    }
  }

  // ANCHOR logout
  async logout(dto: LogoutDto): Promise<CommonResult> {
    await this.datasource.transaction(async (transactionalEntityManager) => {
      try {
        // TODO 코드를 작성하십시오.
        // const entity = await transactionalEntityManager
        //   .getRepository(Entity)
        // if ("validation false") {
        //   throw new HttpException('message', HttpStatus.BAD_REQUEST)
        // }
        // await transactionalEntityManager.getRepository(Entity).save(entity)
      } catch (error) {
        throw new HttpException(error.message, error.status)
      }
    })

    return {
      message: '',
      data: null
    }
  }

  // ANCHOR registerUser
  async registerUser(dto: RegisterUserDto): Promise<CommonResult> {
    await this.datasource.transaction(async (transactionalEntityManager) => {
      try {
        let userId

        switch (dto.platform) {
          case 'google':
            if (dto.idToken) {
              // create OAuth2Client object
              const client = new OAuth2Client('558581304427-a5ihoofmafk41ton2njfudtirq1kha5l.apps.googleusercontent.com')
    
              // verify IdToken
              let ticket
              try {
                ticket = await client.verifyIdToken({
                  idToken: dto.idToken
                })
              } catch (e) {
                // return 401 response
                throw new HttpException(e.message, HttpStatus.UNAUTHORIZED)
              }
    
              // get payload
              const payload = ticket.getPayload()
              userId = payload.sub
            } else {
              throw new HttpException('잘못 된 접근입니다.', HttpStatus.BAD_REQUEST)
            }
            console.log("idToken 검증 성공: ", userId)
            break

        }

        if (!userId) {
          throw new HttpException('잘못 된 접근입니다.', HttpStatus.BAD_REQUEST)
        }


        // 중복체크
        const user = await transactionalEntityManager
          .getRepository(User)
          .findOne({
            where: {
              signType: dto.platform,
              account: userId,
              deletedAt: IsNull()
            }
          })
        if (user) {
          throw new HttpException('account already exist', HttpStatus.BAD_REQUEST)
        }

        // Create new user data
        const newUser = new User()
        newUser.account = userId
        newUser.password = userId
        newUser.signType = dto.platform
        newUser.birth = dto.birth
        newUser.gender = dto.gender
        newUser.name = dto.name

        // Insert
        await transactionalEntityManager.getRepository(User).save(newUser)
      } catch (error) {
        throw new HttpException(error.message, error.status)
      }
    })

    return {
      message: '',
      data: null
    }
  }
}
