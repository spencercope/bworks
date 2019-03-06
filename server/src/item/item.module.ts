import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { itemSchema } from './models/item.model';
import { DonorModule } from '../donor/donor.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Item', schema: itemSchema }]),
    DonorModule,
  ],
  providers: [ItemService],
  controllers: [ItemController],
  exports: [ItemService],
})
export class ItemModule {}
