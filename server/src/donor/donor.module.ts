import {Module} from '@nestjs/common';
import {DonorService} from './donor.service';
import {DonorController} from './donor.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {donorSchema} from "./models/donor.model";

@Module({
    imports: [MongooseModule.forFeature([{name: 'Donor', schema: donorSchema}])],
    providers: [DonorService],
    controllers: [DonorController]
})
export class DonorModule {
}
