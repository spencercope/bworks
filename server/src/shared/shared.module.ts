import { Global, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { EmailModule } from './email/email.module';

@Global()
@Module({
  imports: [AuthModule, CloudinaryModule, EmailModule],
})
export class SharedModule {}
