import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Makes PrismaService available app-wide (optional, but recommended for Prisma)
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // <--- This is key!
})
export class PrismaModule {}

