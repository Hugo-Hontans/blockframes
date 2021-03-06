import SendGrid from '@sendgrid/mail';
import { sendgridAPIKey } from '../environments/environment';
export { EmailRequest, EmailTemplateRequest } from '@blockframes/utils/emails';
import { EmailRequest, EmailTemplateRequest } from '@blockframes/utils/emails';
import { MailDataRequired } from '@sendgrid/helpers/classes/mail';
import { ErrorResultResponse } from '../utils';
import { CallableContext } from 'firebase-functions/lib/providers/https';
import { db } from './firebase';
import { getSendgridFrom } from '@blockframes/utils/apps';
import { EmailJSON } from '@sendgrid/helpers/classes/email-address';

/**
 * Sends a transactional email configured by the EmailRequest provided.
 *
 * Handles development mode: logs a warning when no sendgrid API key is provided.
 */
export async function sendMail({ to, subject, text }: EmailRequest, from: EmailJSON = getSendgridFrom()): Promise<any> {
  if (sendgridAPIKey === '') {
    console.warn('No sendgrid API key set, skipping');
    return;
  }
  SendGrid.setApiKey(sendgridAPIKey);
  const msg: MailDataRequired = {
    from,
    to,
    subject,
    text,
  };

  return SendGrid.send(msg);
}

export function sendMailFromTemplate({ to, templateId, data }: EmailTemplateRequest, from: EmailJSON = getSendgridFrom()) {
  if (sendgridAPIKey === '') {
    console.warn('No sendgrid API key set, skipping');
    return;
  }
  SendGrid.setApiKey(sendgridAPIKey);

  const msg: MailDataRequired = {
    from,
    to,
    templateId,
    dynamicTemplateData: data,
  };

  return SendGrid.send(msg);
}

/**
 * Http callabable function to send an email just like the other emails of the app are sent.
 * For testing purposes
 * @param data 
 * @param context 
 */
export const sendTestMail = async (
  data: { request: EmailRequest, from: EmailJSON },
  context: CallableContext
): Promise<ErrorResultResponse> => {
  if (!context?.auth) { throw new Error('Permission denied: missing auth context.'); }
  const admin = await db.doc(`blockframesAdmin/${context.auth.uid}`).get();
  if (!admin.exists) { throw new Error('Permission denied: you are not blockframes admin'); }

  try {
    await sendMail(data.request, data.from || getSendgridFrom());
    return { error: '', result: 'OK' };
  } catch (error) {
    return {
      error: error.message ? error.message : 'Unknown error',
      result: 'NOK'
    };
  }
}