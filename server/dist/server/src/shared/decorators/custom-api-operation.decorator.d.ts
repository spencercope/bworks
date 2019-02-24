export declare const CustomApiOperation: (options: {
    title: string;
    description?: string;
    operationId?: string;
    deprecated?: boolean;
}) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
