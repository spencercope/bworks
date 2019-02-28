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
export declare class CloudinaryModule {
}
