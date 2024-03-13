import { Controller, Query, Get as NestGet, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { Get } from './core/decorators/routes.decorator';
import GetLocusRequestDTO from './dto/request/get_locus.request';
import { GetJwtRequestDTO, UserType } from './dto/request/get_jwt.request';
import { Authorized } from './core/decorators/authorize.decorator';
import GetJwtResponseDTO from './dto/response/get_jwt.response';
import GetLocusResponseDTO from './dto/response/get_locus_response';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @NestGet()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get({
    path: '/jwt',
    description: 'get jwt token',
    response: GetJwtResponseDTO,
  })
  async getJWT(@Query() data: GetJwtRequestDTO): Promise<GetJwtResponseDTO> {
    return await this.appService.getJWT(data);
  }

  @Authorized()
  @Get({
    path: '/locus',
    description: 'get locus',
    response: GetLocusResponseDTO,
  })
  async getLocus(
    @Query() data: GetLocusRequestDTO,
    @Request() req,
  ): Promise<GetLocusResponseDTO> {
    const userType: UserType = req?.user?.userType;
    return await this.appService.getLocus(data, userType);
  }
}
