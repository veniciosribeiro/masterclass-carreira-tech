import nodemailer from 'nodemailer';

export interface EmailData {
  to: string;
  subject: string;
  htmlBody: string;
}

export interface EmailResults {
  to: string;
  name: string;
  sessionId: string;
  profile: string;
  scores: {
    technical: number;
    behavioral: number;
    areas: string[];
  };
}

const emailTemplate = (data: EmailResults): string => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Helvetica, Arial, sans-serif;
            background-color: #0D1117;
            color: #C9D1D9;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #161B22;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          }
          .header {
            background: linear-gradient(135deg, #19e65e 0%, #0D1117 100%);
            padding: 30px;
            border-radius: 8px 8px 0 0;
          }
          .header h1 {
            margin: 0;
            color: #19e65e;
            font-size: 28px;
            font-weight: 700;
          }
          .content {
            padding: 30px;
          }
          .greeting {
            font-size: 20px;
            margin-bottom: 20px;
          }
          .profile {
            background-color: #0D1117;
            border: 1px solid #30363D;
            border-radius: 6px;
            padding: 20px;
            margin: 20px 0;
          }
          .profile-title {
            color: #FFFFFF;
            margin: 0 0 10px 0;
            font-size: 18px;
          }
          .score-breakdown {
            margin: 20px 0;
          }
          .score-item {
            margin: 10px 0;
            display: flex;
            justify-content: space-between;
          }
          .score-value {
            font-weight: 600;
          }
          .cta-button {
            display: inline-block;
            background-color: #19e65e;
            color: #0D1117;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin-top: 20px;
          }
          .footer {
            padding: 20px;
            text-align: center;
            border-top: 1px solid #30363D;
            font-size: 14px;
            color: #8B949E;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Seus Resultados do TechCareer Test</h1>
          </div>
          <div class="content">
            <p class="greeting">Olá, ${data.name}!</p>
            <p>Recebemos com carinho a sua participação no TechCareer Test. Seu resultado detalhado foi preparado e está disponível abaixo:</p>

            <div class="profile">
              <h2 class="profile-title">Seu Perfil Tech</h2>
              <p style="margin: 0 0 10px 0; font-size: 22px; color: #FFFFFF;">${data.profile}</p>
            </div>

            <h2 style="color: #FFFFFF; margin: 20px 0;">Resumo dos Pontos</h2>

            <div class="score-breakdown">
              <div class="score-item">
                <span>Áreas Técnicas:</span>
                <span class="score-value">${data.scores.technical}%</span>
              </div>
              <div class="score-item">
                <span>Comportamental:</span>
                <span class="score-value">${data.scores.behavioral}%</span>
              </div>
            </div>

            <p>Para visualizar sua análise completa e os detalhes técnicos, clique no botão abaixo:</p>

            <a href="http://localhost:3000/teste/${data.sessionId}" class="cta-button">
              Ver Relatório Completo
            </a>

            <p style="margin-top: 30px; font-size: 14px; color: #8B949E;">
              Este email foi enviado automaticamente pelo TechCareer Test. Se tiver dúvidas, entre em contato conosco.
            </p>
          </div>

          <div class="footer">
            &copy; ${new Date().getFullYear()} TechCareer Test. Todos os direitos reservados.
          </div>
        </div>
      </body>
    </html>
  `;
};

async function sendEmail(data: EmailData): Promise<void> {
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

async function sendResults(data: EmailResults): Promise<void> {
  const htmlBody = emailTemplate(data);
  await sendEmail({
    to: data.to,
    subject: 'Seus Resultados do TechCareer Test',
    htmlBody,
  });
}

export { sendEmail, sendResults };
