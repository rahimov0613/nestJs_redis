import { Resend } from 'resend';

export function sendMessage(to: string, html: string) {
  const resend = new Resend(process.env.OTP_TOKEN);
  return resend.emails.send({
    from: 'mironshohasadov1603@gmail.com',
    to,
    replyTo: 'mironshohasadov1603@gmail.com',
    subject: 'Registarion',
    html,
  });
}
