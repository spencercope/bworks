"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
const api_exception_model_1 = require("../api-exception.model");
exports.CustomApiDefaultErrors = () => {
    return (target, propertyKey, descriptor) => {
        swagger_1.ApiBadRequestResponse({ type: api_exception_model_1.ApiException, description: 'Bad Request' })(target, propertyKey, descriptor);
        swagger_1.ApiInternalServerErrorResponse({
            type: api_exception_model_1.ApiException,
            description: 'Internal Server Error'
        })(target, propertyKey, descriptor);
    };
};
//# sourceMappingURL=custom-api-errors.decorator.js.map