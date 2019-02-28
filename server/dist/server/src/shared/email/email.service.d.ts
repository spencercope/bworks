import { EmailTemplates } from './email-templates.enum';
export interface EmailContent {
    [key: string]: any;
}
export interface EmailData {
    html: string;
    subject: string;
    text?: string;
}
export declare class EmailService {
    private readonly _emailAuthUsername;
    private readonly _emailAuthPassword;
    private readonly _rootDir;
    private readonly _defaultBody;
    private readonly _templateHtml;
    private readonly _templateText;
    private readonly _fromEmail;
    private _email;
    private _toEmail;
    constructor();
    sendEmail(templateName: EmailTemplates, to: string | string[], from?: string, data?: EmailContent): Promise<void>;
    private prepareTemplate;
    private addContentToTemplate;
    private initializeEmail;
    private initializeBaseTemplate;
    private getDefaultEmailConfig;
    private isTemplateExist;
}
