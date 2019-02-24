import { FileReferenceService } from "./file-reference.service";
export declare class FileReferenceController {
    private readonly fileReferenceService;
    constructor(fileReferenceService: FileReferenceService);
    upload(file: any, note: string, itemId: string): Promise<boolean>;
}
