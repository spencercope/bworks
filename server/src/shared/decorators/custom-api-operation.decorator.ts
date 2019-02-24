import {ApiOperation} from '@nestjs/swagger';

export const CustomApiOperation = (options: { title: string, description?: string, operationId?: string, deprecated?: boolean }) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const controllerName = target.constructor.name;
        ApiOperation(
            {
                ...options,
                operationId: `${controllerName.substr(0, controllerName.indexOf('Controller'))}_${options.title}`
            },
        )(target, propertyKey, descriptor);
    };
};
