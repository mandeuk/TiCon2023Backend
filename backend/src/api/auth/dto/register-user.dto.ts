import { ApiProperty } from '@nestjs/swagger'

export class RegisterUserDto {
  @ApiProperty({
    description: 'platform',
    example: 'sample1',
    required: false
  })
  platform: string | null

  @ApiProperty({
    description: 'token',
    example: 'sample1',
    required: false
  })
  idToken: string | null

  @ApiProperty({
    description: 'name',
    example: 'sample1',
    required: false
  })
  name: string | null

  @ApiProperty({
    description: 'gender',
    example: 'sample1',
    required: false
  })
  gender: string | null

  @ApiProperty({
    description: 'birth',
    example: 'sample1',
    required: false
  })
  birth: string | null
}
