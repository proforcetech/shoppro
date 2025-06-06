// partstech.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { LookupPartsDto } from './dto/lookup-parts.dto';

@Injectable()
export class PartsTechService {
  private baseUrl: string;
  private apiKey: string;

  constructor(
    private config: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.apiKey = this.config.get('PARTSTECH_API_KEY') ?? '';
    this.baseUrl = this.config.get('PARTSTECH_BASE_URL') ?? '';
    if (!this.apiKey || !this.baseUrl) {
      throw new Error('Missing PARTSTECH API configuration');
    }
  }

  async lookup(dto: LookupPartsDto) {
    const url = `${this.baseUrl}/search/parts`;

    const headers = {
      Authorization: `Bearer ${this.apiKey}`,
      Accept: 'application/json',
    };

    const query = {
      keyword: dto.keyword,
      vin: dto.vin,
      brand: dto.brand,
    };

    const { data } = await this.httpService.axiosRef.get(url, { headers, params: query });
    return data;
  }

  async getCatalog(vin: string) {
    const url = `${this.baseUrl}/catalog/vehicles/${vin}`;
    const headers = { Authorization: `Bearer ${this.apiKey}` };
    const { data } = await this.httpService.axiosRef.get(url, { headers });
    return data;
  }
}

