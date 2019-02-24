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
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const expressApp = express();
        expressApp.use(cors());
        expressApp.use(compression());
        expressApp.use(helmet());
        const app = yield core_1.NestFactory.create(app_module_1.AppModule, expressApp);
        app.setGlobalPrefix('api');
        yield app.listen(process.env.PORT || 3000, () => {
            common_1.Logger.log('Server connected to port 3000', 'NestApplication');
        });
    });
}
bootstrap();
//# sourceMappingURL=main.js.map