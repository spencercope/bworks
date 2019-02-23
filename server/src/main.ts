import * as express from 'express';
import * as cors from 'cors';
import * as compression from 'compression';
import * as helmet from 'helmet';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Logger} from "@nestjs/common";

async function bootstrap() {
  const expressApp = express();
  expressApp.use(cors());
  expressApp.use(compression());
  expressApp.use(helmet());

  const app = await NestFactory.create(AppModule, expressApp);
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT || 3000, () => {
    Logger.log('Server connected to port 3000', 'NestApplication');
  });
}
bootstrap();
