import { ApiProperty } from '@nestjs/swagger'

export class GetUserDto {
  @ApiProperty({
    description: 'parameter 1',
    example: 'sample1',
    required: false
  })
  parameter1: string | null
}
