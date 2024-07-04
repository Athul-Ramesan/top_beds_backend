import { IsNotEmpty, IsString, IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  sender: string;

  @IsOptional()
  @IsString()
  receiver?: string;

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
