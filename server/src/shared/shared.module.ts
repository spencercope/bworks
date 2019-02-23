import {Global, Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Global()
@Module({
    imports: [AuthModule, CloudinaryModule]
})
export class SharedModule {
}
