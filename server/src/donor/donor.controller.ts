import {Controller} from '@nestjs/common';
import {DonorService} from "./donor.service";

@Controller('donors')
export class DonorController {
    constructor(private readonly donorService: DonorService) {
    }


}
