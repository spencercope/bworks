import { Document, SchemaOptions } from 'mongoose';

export interface BaseDocument extends Document {
  createdAt?: Date;
  updatedAt?: Date;
  id?: string;
}

export const schemaOptions: SchemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
};
