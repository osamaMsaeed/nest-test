import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export default class DatabaseService
  extends PrismaClient
  implements OnModuleInit
{
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    console.log('DB CONNECTED');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
