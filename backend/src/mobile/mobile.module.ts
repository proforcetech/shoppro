import { Module } from '@nestjs/common';
import { MobileService } from './mobile.service';
import { MobileController } from './mobile.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [MobileController],
  providers: [MobileService, PrismaService],
})
export class MobileModule {}

