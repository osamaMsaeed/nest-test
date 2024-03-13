import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { ParseToInt } from 'src/core/decorators/transform.decorator';
import PaginatedRequest from 'src/core/request/paginated.request';

export enum MembershipStatus {
  MEMBER = 'member',
  HIGHLIGHTED = 'highlighted',
}

const GetLocusRequestDTOIncludeParams: Array<
  keyof Pick<Prisma.rncLocusInclude, 'locusMembers'>
> = ['locusMembers'];

export default class GetLocusRequestDTO extends PaginatedRequest {
  @ApiPropertyOptional()
  @IsOptional()
  @ParseToInt()
  @IsInt()
  id: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  assemblyId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @ParseToInt()
  @IsInt()
  regionId: number;

  @ApiPropertyOptional({ enum: MembershipStatus })
  @IsOptional()
  @IsEnum(MembershipStatus)
  membershipStatus: MembershipStatus;

  @ApiPropertyOptional({
    isArray: true,
    type: String,
    description: `Available values: ${GetLocusRequestDTOIncludeParams.join(', ')}`,
  })
  @IsOptional()
  @Transform(({ value }) =>
    Array.isArray(value) ? value.map((item) => item) : [value],
  )
  @IsArray()
  @IsEnum(GetLocusRequestDTOIncludeParams, { each: true })
  includeParams?: typeof GetLocusRequestDTOIncludeParams;
}
