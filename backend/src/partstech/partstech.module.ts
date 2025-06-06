// partstech.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PartsTechService } from './partstech.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [PartsTechService],
  exports: [PartsTechService],
})
export class PartsTechModule {}
