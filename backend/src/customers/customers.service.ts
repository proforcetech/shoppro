import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './interfaces/customer.interface';

@Injectable()
export class CustomersService {
  private customers: Customer[] = [];

  create(dto: CreateCustomerDto): Customer {
    const newCustomer: Customer = {
      id: crypto.randomUUID(),
      ...dto,
    };

    this.customers.push(newCustomer);
    return newCustomer;
  }

  findAll(): Customer[] {
    return this.customers;
  }

  findOne(id: string): Customer {
    const customer = this.customers.find(c => c.id === id);
    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }
    return customer;
  }

  update(id: string, dto: UpdateCustomerDto): Customer {
    const index = this.customers.findIndex(c => c.id === id);
    if (index === -1) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }

    const updatedCustomer = {
      ...this.customers[index],
      ...dto,
    };

    this.customers[index] = updatedCustomer;
    return updatedCustomer;
  }
}

