import { ApiProperty } from '@nestjs/swagger';
import { MembershipStatus } from '../request/get_locus.request';

export class LocusMemberModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  regionId: number;

  @ApiProperty()
  locusId: number;

  @ApiProperty()
  ursTaxId: string;

  @ApiProperty({ enum: MembershipStatus })
  membershipStatus: MembershipStatus;
}

export class LocusModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  assemblyId: string;

  @ApiProperty()
  locusName: string;

  @ApiProperty()
  publicLocusName: string;

  @ApiProperty()
  chromosome: string;

  @ApiProperty()
  strand: string;

  @ApiProperty()
  locusStart: number;

  @ApiProperty()
  locusStop: number;

  @ApiProperty()
  memberCount: number;

  @ApiProperty({ isArray: true, type: LocusMemberModel })
  locusMembers: LocusMemberModel[];
}
