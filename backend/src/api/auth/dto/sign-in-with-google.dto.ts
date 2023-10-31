import { ApiProperty } from '@nestjs/swagger'

export class SignInWithGoogleDto {
  @ApiProperty({
    description: 'idToken',
    example: 'sample1',
    required: false
  })
  idToken: string | null
}
