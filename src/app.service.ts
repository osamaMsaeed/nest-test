import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import DatabaseService from './database.service';
import GetLocusRequestDTO from './dto/request/get_locus.request';
import {
  GetOrderOptions,
  GetPaginationOptions,
} from './core/helpers/util.helper';
import { GetJwtRequestDTO, UserType } from './dto/request/get_jwt.request';
import { JwtService } from '@nestjs/jwt';
import GetJwtResponseDTO from './dto/response/get_jwt.response';
import GetLocusResponseDTO from './dto/response/get_locus_response';

@Injectable()
export class AppService {
  constructor(
    private dbService: DatabaseService,
    private jwtService: JwtService,
  ) {}

  private readonly users: Array<{ userId: number; userType: UserType }> = [
    {
      userId: 1,
      userType: UserType.ADMIN,
    },
    {
      userId: 2,
      userType: UserType.USER,
    },
    {
      userId: 3,
      userType: UserType.LIMITED,
    },
  ];

  getHello(): string {
    return 'Hello World!';
  }

  async getJWT(data: GetJwtRequestDTO): Promise<GetJwtResponseDTO> {
    const user = this.users.find((user) => user.userType === data.userType);
    const payload = { sub: user.userId, userType: user.userType };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async getLocus(
    data: GetLocusRequestDTO,
    userType: UserType,
  ): Promise<GetLocusResponseDTO> {
    const findManyArgs: Prisma.rncLocusFindManyArgs = {};

    const whereParams: Prisma.rncLocusWhereInput = {
      ...(data.id && { id: data.id }),
      ...(data.assemblyId && { assemblyId: data.assemblyId }),
    };
    whereParams.AND = [];
    if (data.regionId && userType !== UserType.LIMITED) {
      whereParams.AND.push({
        locusMembers: { some: { regionId: data.regionId } },
      });
    } else if (userType === UserType.LIMITED) {
      const regionIds = [86118093, 86696489, 88186467];
      whereParams.AND.push({
        locusMembers: { some: { regionId: { in: regionIds } } },
      });
    }
    if (data.membershipStatus) {
      whereParams.AND.push({
        locusMembers: { some: { membershipStatus: data.membershipStatus } },
      });
    }

    findManyArgs.where = whereParams;

    if (data.includeParams?.length && userType === UserType.ADMIN) {
      const includeParams: Prisma.rncLocusInclude = {};
      for (let param of data.includeParams) {
        includeParams[param] = { take: 1 };
      }
      findManyArgs.include = includeParams;
    }

    const pagination = GetPaginationOptions(data);
    const order = GetOrderOptions(data);
    const result = await this.dbService.rncLocus.findMany({
      ...findManyArgs,
      ...pagination,
      orderBy: order,
    });

    const count = await this.dbService.rncLocus.count({ where: whereParams });

    const parsedRes = JSON.parse(
      JSON.stringify(result, (key, value) =>
        typeof value === 'bigint' ? +value.toString() : value,
      ),
    );

    return { data: parsedRes, count };
  }
}
