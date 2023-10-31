import { ApiProperty } from '@nestjs/swagger'

export class LogoutDto {
  @ApiProperty({
    description: 'parameter 1',
    example: 'sample1',
    required: false
  })
  userId: string | null
}
