import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { ApiException } from '../api-exception.model';

export const CustomApiDefaultErrors = () => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiBadRequestResponse({ type: ApiException, description: 'Bad Request' })(
      target,
      propertyKey,
      descriptor,
    );
    ApiInternalServerErrorResponse({
      type: ApiException,
      description: 'Internal Server Error',
    })(target, propertyKey, descriptor);
  };
};
