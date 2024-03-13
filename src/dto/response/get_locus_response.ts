import { ApiProperty } from '@nestjs/swagger';
import { LocusModel } from './model';

export default class GetLocusResponseDTO {
  @ApiProperty({ isArray: true, type: LocusModel })
  data: LocusModel[];

  @ApiProperty()
  count: number;
}
