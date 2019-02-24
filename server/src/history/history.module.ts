import {Module} from '@nestjs/common';
import {HistoryService} from './history.service';
import {HistoryController} from './history.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {historySchema} from "./models/history.model";
import {ItemModule} from "../item/item.module";

@Module({
    imports: [MongooseModule.forFeature([{name: 'History', schema: historySchema}]), ItemModule],
    providers: [HistoryService],
    controllers: [HistoryController]
})
export class HistoryModule {
}
