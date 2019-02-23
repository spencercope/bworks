import { BaseDocument } from './base.model';

export abstract class BaseVm<T extends BaseDocument> {
  protected constructor(model: T = null) {
    if (model) {
      this.createdAt = model.createdAt;
      this.updatedAt = model.updatedAt;
      this.id = model.id;
      this.getViewModel(model);
    }
  }

  createdAt?: Date;
  updatedAt?: Date;
  id?: string;

  abstract getViewModel(model: T): void;
}
