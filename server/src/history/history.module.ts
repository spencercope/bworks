import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { historySchema } from './models/history.model';
import { ItemModule } from '../item/item.module';
import { EmailModule } from '../shared/email/email.module';
import { DonorModule } from '../donor/donor.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'History', schema: historySchema }]),
    ItemModule,
    DonorModule,
    EmailModule,
  ],
  providers: [HistoryService],
  controllers: [HistoryController],
})
export class HistoryModule {}
