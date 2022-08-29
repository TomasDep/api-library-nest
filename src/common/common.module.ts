import { Module } from '@nestjs/common';
import { HandleErrorsService } from './services/handle-errors.service';

@Module({
  providers: [HandleErrorsService],
  exports: [CommonModule, HandleErrorsService],
})
export class CommonModule {}
