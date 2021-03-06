import { ApiProperty } from '@nestjs/swagger';

export class CreateWechatDto {
  @ApiProperty({
    description: '机器人名称',
    example: '君',
  })
  name: string;
}
