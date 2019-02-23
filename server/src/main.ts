import * as express from 'express';
import { join }  from 'path';
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

  const CLIENT_FILES = join(__dirname, '..', '..', 'client', 'dist');
  app.use(express.static(CLIENT_FILES));

  await app.listen(process.env.PORT || 3000, () => {
    Logger.log('Server connected to port 3000', 'NestApplication');
  });
}
bootstrap();
