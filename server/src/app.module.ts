import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { FileReferenceModule } from './file-reference/file-reference.module';
import { DonorModule } from './donor/donor.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:admin@bworks1-sknsg.gcp.mongodb.net/test?retryWrites=true', { // TODO: ConnectionString missing
      retryAttempts: 5,
      retryDelay: 300,
      useNewUrlParser: true,
      useCreateIndex: true,
    }),
    SharedModule,
    UserModule,
    FileReferenceModule,
    DonorModule,
    ItemModule,
  ],
})
export class AppModule {}
