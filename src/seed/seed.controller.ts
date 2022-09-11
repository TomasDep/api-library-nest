import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { SeedService } from './seed.service';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}
  @ApiOperation({ summary: 'Import data to the database' })
  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get()
  public executeSeed(): void {
    this.seedService.runSeed();
  }
}
