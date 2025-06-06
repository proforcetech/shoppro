import {
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Body,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './interfaces/customer.interface';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  create(@Body() dto: CreateCustomerDto): Customer {
    return this.customersService.create(dto);
  }

  @Get()
  findAll(): Customer[] {
    return this.customersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Customer {
    return this.customersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCustomerDto): Customer {
    return this.customersService.update(id, dto);
  }
}

