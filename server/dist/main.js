"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const http_exception_filter_1 = require("./shared/filters/http-exception.filter");
const swagger_1 = require("@nestjs/swagger");
const path_1 = require("path");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const expressApp = express();
        expressApp.use(cors());
        expressApp.use(compression());
        expressApp.use(helmet());
        const logRequestStart = (req, res, next) => {
            const reqTime = Date.now();
            res.on('finish', () => {
                let millis = Date.now() - reqTime;
                common_1.Logger.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${res.get('Content-Length') || 0}b -> ${millis}ms`, 'request');
            });
            next();
        };
        expressApp.use(logRequestStart);
        const app = yield core_1.NestFactory.create(app_module_1.AppModule, expressApp);
        const swaggerOptions = new swagger_1.DocumentBuilder()
            .setTitle('STL BWorks')
            .setDescription('API Documentation for STL BWorks')
            .setVersion('1.0.0')
            .setHost('localhost:3000')
            .setBasePath('/api')
            .setSchemes('http')
            .addBearerAuth('Authorization', 'header')
            .build();
        const swaggerDoc = swagger_1.SwaggerModule.createDocument(app, swaggerOptions);
        swagger_1.SwaggerModule.setup('/api/docs', app, swaggerDoc, {
            explorer: true,
            swaggerUrl: `http://localhost:3000/api/docs-json`,
            swaggerOptions: {
                docExpansion: 'list',
                filter: true,
                showRequestDuration: true,
            },
        });
        expressApp.get('/robots.txt', (req, res) => res.send('User-Agent: *\n' + 'Disallow: /'));
        expressApp.get('/favicon.ico', (req, res) => res.sendStatus(common_1.HttpStatus.NO_CONTENT).end());
        app.setGlobalPrefix('api');
        app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
        app.useStaticAssets(path_1.join(__dirname, '..', 'public', 'client'));
        yield app.listen(process.env.PORT || 3000, () => {
            common_1.Logger.log('Server connected to port 3000', 'NestApplication');
        });
    });
}
bootstrap();
//# sourceMappingURL=main.js.map