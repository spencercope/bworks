import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class ToBooleanPipe implements PipeTransform {
    transform(value: any, { type, metatype }: ArgumentMetadata): any;
}
