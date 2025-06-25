import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client'; // Import the Prisma namespace

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}
  create(createCustomerDto: CreateCustomerDto) {
    // Note: The CreateCustomerDto may need to be updated to accept firstName and lastName
    return this.prisma.customer.create({ data: createCustomerDto });
  }

  findAll() {
    return this.prisma.customer.findMany({ include: { vehicles: true } });
  }

  findOne(id: string) {
    return this.prisma.customer.findUnique({
      where: { id },
      include: { vehicles: true },
    });
  }

  /**
   * Searches for customers by first or last name, case-insensitively.
   * Can handle multi-word searches.
   * @param {string} name - The search query for the customer's name.
   * @returns A promise that resolves to a list of matching customers with their vehicles.
   */
  async searchByName(name: string) {
    if (!name || name.trim() === '') {
      return [];
    }
    const nameParts = name.trim().split(' ').filter(p => p);

    const searchConditions = nameParts.flatMap(part => ([
        { firstName: { contains: part, mode: Prisma.QueryMode.insensitive } }, // Corrected: Use Prisma.QueryMode
        { lastName: { contains: part, mode: Prisma.QueryMode.insensitive } },  // Corrected: Use Prisma.QueryMode
    ]));

    return this.prisma.customer.findMany({
      where: {
        OR: searchConditions,
      },
      include: {
        vehicles: true,
      },
      take: 10,
    });
  }

  update(id: string, updateCustomerDto: UpdateCustomerDto) {
    // Note: The UpdateCustomerDto may also need updating
    return this.prisma.customer.update({
      where: { id },
      data: updateCustomerDto,
    });
  }

  remove(id: string) {
    return this.prisma.customer.delete({ where: { id } });
  }
}
