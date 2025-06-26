import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  create(createCustomerDto: CreateCustomerDto) {
    return this.prisma.customer.create({ data: createCustomerDto });
  }

  /**
   * Finds all customers with pagination and search capabilities.
   * @param params - Object containing search, page, and limit parameters.
   * @returns A paginated list of customers and total count.
   */
  async findAll(params: { search?: string; page?: number; limit?: number }) {
    const { search, page = 1, limit = 10 } = params;
    const skip = (page - 1) * limit;

    // The search now includes checks for email and phone number.
    const where: Prisma.CustomerWhereInput = search
      ? {
          OR: [
            { firstName: { contains: search, mode: 'insensitive' } },
            { lastName: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
            { phone: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    // Use a transaction to get both data and count efficiently
    const [customers, totalCustomers] = await this.prisma.$transaction([
      this.prisma.customer.findMany({
        where,
        skip,
        take: limit,
        include: { vehicles: true },
        orderBy: {
          lastName: 'asc',
        },
      }),
      this.prisma.customer.count({ where }),
    ]);

    return {
      data: customers,
      total: totalCustomers,
      currentPage: page,
      totalPages: Math.ceil(totalCustomers / limit),
    };
  }
  
  findOne(id: string) {
    return this.prisma.customer.findUnique({
      where: { id },
      include: { vehicles: true },
    });
  }

  async searchByName(name: string) {
    if (!name || name.trim() === '') {
      return [];
    }
    const nameParts = name.trim().split(' ').filter(p => p);

    const searchConditions = nameParts.flatMap(part => ([
        { firstName: { contains: part, mode: Prisma.QueryMode.insensitive } },
        { lastName: { contains: part, mode: Prisma.QueryMode.insensitive } },
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
    return this.prisma.customer.update({
      where: { id },
      data: updateCustomerDto,
    });
  }

  remove(id: string) {
    return this.prisma.customer.delete({ where: { id } });
  }
}
