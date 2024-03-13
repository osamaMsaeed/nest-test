import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export enum UserType {
  ADMIN = 'admin',
  USER = 'user',
  LIMITED = 'limited',
}

export class GetJwtRequestDTO {
  @ApiProperty({ enum: UserType })
  @IsEnum(UserType)
  userType: UserType;
}
