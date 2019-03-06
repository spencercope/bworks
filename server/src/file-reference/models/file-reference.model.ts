import { BaseDocument, schemaOptions } from '../../shared/base.model';
import { Schema } from 'mongoose';

export interface FileReference extends BaseDocument {
  publicUrl: string;
  fileName: string;
  sizeBytes: number;
  note?: string;
  itemId?: string;
}

export const fileReferenceSchema = new Schema(
  {
    publicUrl: {
      type: String,
      required: true,
    },
    fileName: String,
    sizeBytes: Number,
    note: String,
    itemId: {
      type: Schema.Types.ObjectId,
      ref: 'Item',
    },
  },
  schemaOptions,
);

fileReferenceSchema.pre<FileReference>('findOneAndUpdate', function(next) {
  this.updatedAt = new Date(Date.now());
  return next();
});
