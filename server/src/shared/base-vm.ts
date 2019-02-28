import {BaseDocument} from './base.model';
import {ApiModelPropertyOptional} from '@nestjs/swagger';

export abstract class BaseVm<T extends BaseDocument> {
    protected constructor(model: T = null) {
        if (model) {
            this.createdAt = model.createdAt;
            this.updatedAt = model.updatedAt;
            this.id = model.id;
            this.getViewModel(model);
        }
    }

    @ApiModelPropertyOptional({format: 'datetime', type: String})
    createdAt?: Date;
    @ApiModelPropertyOptional({format: 'datetime', type: String})
    updatedAt?: Date;
    @ApiModelPropertyOptional()
    id?: string;

    abstract getViewModel(model: T): void;
}
