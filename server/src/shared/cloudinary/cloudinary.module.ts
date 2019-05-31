import * as cloudinaryStorage from 'multer-storage-cloudinary';
import * as cloudinary from 'cloudinary';

import { Module, MulterModule } from '@nestjs/common';

export interface CloudinaryFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: 'image/jpeg' | 'image/png';
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: 'jpg' | 'png';
  resource_type: 'image';
  created_at: string;
  tags: string[];
  bytes: number;
  type: 'upload';
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  original_filename: 'file';
}

cloudinary.config({
  cloud_name: 'delorfxul',
  api_key: '261767452865174',
  api_secret: 'h5dN7dKZmTKpv2hEQjIpiWKxAXk',
});
const storage = cloudinaryStorage({
  cloudinary,
  folder: 'uploads',
  allowedFormats: ['jpg', 'png'],
  transformation: [{ width: 1080, height: 1920, crop: 'limit' }],
});

@Module({
  imports: [
    MulterModule.register({
      storage,
    }),
  ],
})
export class CloudinaryModule {}
