import { Model, Types } from 'mongoose';
import { DeleteWriteOpResultObject } from 'mongodb';
import { InternalServerErrorException } from '@nestjs/common';

import { BaseDocument } from './base.model';

export abstract class BaseService<T extends BaseDocument> {
  protected _model: Model<T>;

  createModel(doc?: Partial<T>): T {
    return new this._model(doc);
  }

  async findAll(filter = {}): Promise<T[]> {
    try {
      return this._model.find(filter).exec();
    } catch (err) {
      throw new InternalServerErrorException(err.message, err.toString());
    }
  }

  async findOne(filter = {}): Promise<T> {
    try {
      return this._model.findOne(filter).exec();
    } catch (err) {
      throw new InternalServerErrorException(err.message, err.toString());
    }
  }

  async findById(id: string): Promise<T> {
    try {
      return this._model.findById(this.toObjectId(id)).exec();
    } catch (err) {
      throw new InternalServerErrorException(err.message, err.toString());
    }
  }

  async create(item: T): Promise<T> {
    try {
      return this._model.create(item);
    } catch (err) {
      throw new InternalServerErrorException(err.message, err.toString());
    }
  }

  async delete(id: string): Promise<T> {
    try {
      return this._model.findByIdAndRemove(this.toObjectId(id)).exec();
    } catch (err) {
      throw new InternalServerErrorException(err.message, err.toString());
    }
  }

  async update(id: string, item: T): Promise<T> {
    try {
      return this._model.findByIdAndUpdate(this.toObjectId(id), item, { new: true }).exec();
    } catch (err) {
      throw new InternalServerErrorException(err.message, err.toString());
    }
  }

  async clearCollection(): Promise<DeleteWriteOpResultObject['result']> {
    try {
      return this._model.deleteMany({}).exec();
    } catch (err) {
      throw new InternalServerErrorException(err.message, err.toString());
    }
  }

  async counts(conditions = {}): Promise<number> {
    try {
      return this._model.countDocuments(conditions);
    } catch (e) {
      throw new InternalServerErrorException(e.message, e.toString());
    }
  }

  private toObjectId(id: string): Types.ObjectId {
    return Types.ObjectId(id);
  }
}
