import { Module } from '@nestjs/common';
import { EstimatesService } from './estimates.service';
import { EstimatesController } from './estimates.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [EstimatesController],
  providers: [EstimatesService, PrismaService],
  exports: [EstimatesService],
})
export class EstimatesModule {}

