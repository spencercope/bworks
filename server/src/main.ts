import * as express from 'express';
import { join } from 'path';
import * as cors from 'cors';
import * as compression from 'compression';
import * as helmet from 'helmet';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, Logger } from '@nestjs/common';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const expressApp = express();
  expressApp.use(cors());
  expressApp.use(compression());
  expressApp.use(helmet());

  const logRequestStart = (
    req: express.Request,
    res: express.Response,
    next: any,
  ) => {
    const reqTime = Date.now();
    res.on('finish', () => {
      let millis = Date.now() - reqTime;
      Logger.log(
        `${req.method} ${req.originalUrl} ${res.statusCode} ${res.get(
          'Content-Length',
        ) || 0}b -> ${millis}ms`,
        'request',
      );
    });
    next();
  };
  expressApp.use(logRequestStart);
  const app = await NestFactory.create(AppModule, expressApp);

  // Swagger
  const swaggerOptions = new DocumentBuilder()
    .setTitle('STL BWorks')
    .setDescription('API Documentation for STL BWorks')
    .setVersion('1.0.0')
    // .setHost('192.81.219.113:3000')
    .setHost('localhost:3000')
    .setBasePath('/api')
    .setSchemes('http' as 'http' | 'https')
    .addBearerAuth('Authorization', 'header')
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('/api/docs', app, swaggerDoc, {
    explorer: true,
    swaggerUrl: `http://localhost:3000/api/docs-json`,
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
    },
  });

  // These two lines prevent NOT_FOUND error for robots.txt and favicon.ico with Swagger
  expressApp.get('/robots.txt', (req, res) =>
    res.send('User-Agent: *\n' + 'Disallow: /'),
  );
  expressApp.get('/favicon.ico', (req, res) =>
    res.sendStatus(HttpStatus.NO_CONTENT).end(),
  );

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useStaticAssets(join(__dirname, '..', 'public', 'client'));

  await app.listen(process.env.PORT || 3000, () => {
    Logger.log('Server connected to port 3000', 'NestApplication');
  });
}

bootstrap();
