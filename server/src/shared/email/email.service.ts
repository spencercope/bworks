import * as EmailTemplate from 'email-templates';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { join } from 'path';
import { existsSync, readFileSync } from 'fs';

import { EmailTemplates } from './email-templates.enum';

export interface EmailContent {
  [key: string]: any;
}

export interface EmailData {
  html: string;
  subject: string;
  text?: string;
}

@Injectable()
export class EmailService {
  private readonly _emailAuthUsername: string;
  private readonly _emailAuthPassword: string;
  private readonly _rootDir: string;

  private readonly _defaultBody: string;
  private readonly _templateHtml: string;
  private readonly _templateText: string;
  private readonly _fromEmail: string;

  private _email: EmailTemplate;
  private _toEmail: string;

  constructor() {
    this._emailAuthUsername =
      process.env.EMAIL_USERNAME || 'nartc1410@gmail.com';
    this._emailAuthPassword = process.env.EMAIL_PASSWORD || 'chau1410';
    this._defaultBody = '{{_body}}';
    this._fromEmail = process.env.FROM_SYSTEM || 'nartc1410@gmail.com';

    this._rootDir = './templates';
    this.initializeEmail();
    this._templateHtml = this.initializeBaseTemplate('template.html');
    this._templateText = this.initializeBaseTemplate('template.txt');
  }

  async sendEmail(
    templateName: EmailTemplates,
    to: string | string[],
    from?: string,
    data?: EmailContent,
  ) {
    if (!this.isTemplateExist(templateName)) {
      throw new InternalServerErrorException(
        `Template not found ${templateName}`,
      );
    }

    const emailData: EmailData = await this.prepareTemplate(templateName, data);

    if (typeof to.toString().toLowerCase() === 'object') {
      to = (to as string[]).join(' ');
    }

    const emailOptions: any = {
      message: { to, ...emailData },
    };

    if (from && from !== this._fromEmail) {
      emailOptions.message.from = from;
    }

    try {
      await this._email.send(emailOptions);
    } catch (e) {
      throw new Error('Cannot send email');
    }
  }

  private async prepareTemplate(
    templateName: string,
    data: EmailContent,
  ): Promise<EmailData> {
    try {
      const emailContent: EmailData = await this._email.renderAll(
        templateName,
        data,
      );
      const bodyHtml = this.addContentToTemplate(
        this._templateHtml,
        emailContent.html,
      );
      const bodyText = this.addContentToTemplate(
        this._templateText,
        emailContent.text,
      );
      return {
        ...emailContent,
        html: bodyHtml,
        text: bodyText,
      };
    } catch (e) {
      throw new Error(`Error preparing Template ${templateName}`);
    }
  }

  private addContentToTemplate(template: string, content: string): string {
    return template.replace(this._defaultBody, content);
  }

  private initializeEmail() {
    const emailConfig = this.getDefaultEmailConfig();
    this._email = new EmailTemplate(emailConfig);
  }

  private initializeBaseTemplate(path: string) {
    return readFileSync(join(this._rootDir, path), 'utf8');
  }

  private getDefaultEmailConfig() {
    /**
     * * send to true, preview to false and jsonTransport to false to actually send Email
     */
    return {
      message: { from: this._fromEmail },
      views: { root: this._rootDir, options: { extension: 'hbs' } },
      jsonTransport: true,
      // send: true,
      // preview: false,
      transport: {
        service: 'gmail',
        auth: {
          user: this._emailAuthUsername,
          pass: this._emailAuthPassword,
        },
      },
    };
  }

  private isTemplateExist(templateName: string): boolean {
    return existsSync(join(this._rootDir, templateName));
  }
}
