import { IsNotEmpty, IsString, IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  sender: Types.ObjectId;

  @IsOptional()
  @IsString()
  receiver?: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsEnum(['text', 'image', 'video', 'audio'])
  contentType: string;

  @IsOptional()
  @IsBoolean()
  receiverSeen?: boolean;
}
