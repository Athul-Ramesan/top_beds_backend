import { IsNotEmpty, IsString, IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  sender: Types.ObjectId;

  @IsOptional()
  @IsString()
  receiver?: Types.ObjectId;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsEnum(['text', 'image', 'video', 'audio'])
  contentType: string;

  @IsOptional()
  @IsOptional()
  @IsBoolean()
  receiverSeen?: boolean;
}
