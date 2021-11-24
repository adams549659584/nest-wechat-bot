import { PartialType } from '@nestjs/mapped-types';
import { CreateWechatDto } from './create-wechat.dto';

export class UpdateWechatDto extends PartialType(CreateWechatDto) {}
