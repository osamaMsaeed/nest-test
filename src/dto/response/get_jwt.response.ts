import { ApiProperty } from '@nestjs/swagger';

export default class GetJwtResponseDTO {
  @ApiProperty()
  accessToken: string;
}
