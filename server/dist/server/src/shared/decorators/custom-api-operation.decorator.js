"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
exports.CustomApiOperation = (options) => {
    return (target, propertyKey, descriptor) => {
        const controllerName = target.constructor.name;
        swagger_1.ApiOperation(Object.assign({}, options, { operationId: `${controllerName.substr(0, controllerName.indexOf('Controller'))}_${options.title}` }))(target, propertyKey, descriptor);
    };
};
//# sourceMappingURL=custom-api-operation.decorator.js.map