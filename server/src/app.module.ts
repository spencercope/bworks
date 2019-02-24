import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {UserModule} from './user/user.module';
import {SharedModule} from './shared/shared.module';
import {FileReferenceModule} from './file-reference/file-reference.module';
import {DonorModule} from './donor/donor.module';
import {ItemModule} from './item/item.module';
import {HistoryModule} from './history/history.module';
import {AppController} from './app.controller';
import {FrontendMiddleware} from "./frontend.middleware";

@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://admin:admin@bworks1-sknsg.gcp.mongodb.net/test?retryWrites=true', { // TODO: ConnectionString missing
            retryAttempts: 5,
            retryDelay: 300,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
        }),
        SharedModule,
        UserModule,
        FileReferenceModule,
        DonorModule,
        ItemModule,
        HistoryModule,
    ],
    controllers: [AppController],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(FrontendMiddleware).forRoutes(
            {
                path: '/**', // For all routes
                method: RequestMethod.ALL, // For all methods
            },
        );
    }
}
