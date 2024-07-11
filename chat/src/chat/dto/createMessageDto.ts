import { IsNotEmpty, IsString, IsBoolean, IsEnum, IsOptional } from 'class-validator';

export class CreateMessageDto {

  
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  chatId: string;
  
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
