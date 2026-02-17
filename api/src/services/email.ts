import nodemailer from 'nodemailer';

export interface EmailData {
  to: string;
  subject: string;
  htmlBody: string;
}

export async function sendEmail(data: EmailData): Promise<void> {
  const { to, subject, htmlBody } = data;

  // Validate email
  if (!to || !to.includes('@')) {
    throw new Error(`Invalid email address: ${to}`);
  }

  // Create transporter with SMTP configuration
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
    },
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@techcareer.com',
      to,
      subject,
      html: htmlBody,
    });

    console.log('Email sent successfully:', info.messageId);
  } catch (error) {
    console.error('Email send error:', error);
    throw new Error('Failed to send email');
  }
}
