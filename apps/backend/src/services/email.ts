import nodemailer from 'nodemailer';

export interface EmailData {
  to: string;
  subject: string;
  htmlBody: string;
  attachments?: { filename: string; content: Buffer }[];
}

export interface EmailResults {
  to: string;
  name: string;
  sessionId: string;
  profile: string;
  description: string;
  recommendation: string;
  scores: {
    technical: number;
    behavioral: number;
    areas: string[];
  };
  pdfBuffer?: Buffer;
}

// ... (interfaces remain same) ...

const emailTemplate = (data: EmailResults): string => {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #0D1117;
            color: #C9D1D9;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #161B22;
            border-radius: 12px;
            border: 1px solid #30363D;
            overflow: hidden;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
          }
          .header {
            background-color: #0D1117; /* Darker header as per screenshot */
            padding: 40px 30px 20px 30px;
            text-align: center;
            border-bottom: 2px solid #19e65e;
          }
          .logo-text {
             font-family: monospace;
             font-weight: 700;
             font-size: 24px;
             color: #FFFFFF;
             letter-spacing: -0.5px;
          }
          .highlight {
            color: #19e65e;
          }
          .content {
            padding: 40px 30px;
          }
          .greeting {
            font-size: 22px;
            font-weight: 600;
            color: #FFFFFF;
            margin-bottom: 16px;
          }
          .text {
            font-size: 16px;
            line-height: 1.6;
            color: #8B949E;
            margin-bottom: 24px;
          }
          .card {
            background-color: #0D1117;
            border: 1px solid #30363D;
            border-radius: 8px;
            padding: 30px; /* Increased padding */
            margin-bottom: 24px;
          }
          .profile-label {
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #8B949E;
            margin-bottom: 8px;
          }
          .profile-value {
            font-size: 32px; /* Larger font */
            font-weight: 700;
            color: #FFFFFF;
            margin: 0 0 20px 0;
          }
          .separator {
            border-top: 1px solid #30363D; 
            margin: 20px 0;
          }
          .stats-row {
            margin-bottom: 15px;
            font-size: 14px;
            color: #8B949E;
          }
          .stats-value {
            font-size: 16px;
            font-weight: 700;
            color: #19e65e;
            margin-left: 8px;
          }
          .section-title {
            font-size: 14px;
            font-weight: 700;
            color: #19e65e;
            margin-top: 25px;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .section-text {
            font-size: 14px;
            color: #C9D1D9;
            line-height: 1.6;
          }
          .cta-container {
            text-align: center;
            margin-top: 40px;
            margin-bottom: 20px;
          }
          .cta-button {
            display: inline-block;
            background-color: #19e65e;
            color: #0D1117;
            padding: 16px 32px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 700;
            font-size: 16px;
            transition: background-color 0.2s;
          }
          .cta-button:hover {
            background-color: #12a843;
          }
          .footer {
            background-color: #0D1117;
            padding: 24px;
            text-align: center;
            font-size: 12px;
            color: #484F58;
            border-top: 1px solid #30363D;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo-text">TechCareer <span class="highlight">Test Drive</span></div>
          </div>
          <div class="content">
            <div class="greeting">Olá, ${data.name}!</div>
            <p class="text">
              Parabéns por concluir o Test Drive da Carreira Tech! Seu relatório completo de aptidão foi gerado e <strong>está anexado neste e-mail (PDF).</strong>
            </p>
            <p class="text">
              Aqui está um resumo rápido do seu resultado:
            </p>

            <div class="card">
              <div class="profile-label">Seu Perfil Principal</div>
              <h2 class="profile-value">${data.profile}</h2>
              
              <div class="stats-row">
                Aptidão Técnica <span class="stats-value">${data.scores.technical}%</span>
              </div>
              <div class="stats-row">
                Perfil Comportamental <span class="stats-value">${data.scores.behavioral}%</span>
              </div>

              <div class="separator"></div>
              
              <div class="section-title">Análise do Perfil</div>
              <p class="section-text">${data.description}</p>
              
              <div class="section-title">Próximos Passos Recomendados</div>
              <p class="section-text">${data.recommendation}</p>
            </div>

            <p class="text">
              O relatório PDF em anexo contém a análise detalhada de todas as suas respostas, sua afinidade com Front-end, Back-end e Dados/IA.
            </p>

            <div class="cta-container">
              <a href="${frontendUrl}/teste/${data.sessionId}/resultado" class="cta-button">
                Ver Resultado Online
              </a>
            </div>
          </div>

          <div class="footer">
            &copy; ${new Date().getFullYear()} TechCareer Test. Todos os direitos reservados.<br>
            Este e-mail foi enviado automaticamente.
          </div>
        </div>
      </body>
    </html>
  `;
};

async function sendEmail(data: EmailData): Promise<void> {
  const { to, subject, htmlBody, attachments } = data;

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
      attachments,
    });

    console.log('Email sent successfully:', info.messageId);
  } catch (error) {
    console.error('Email send error:', error);
    throw new Error('Failed to send email');
  }
}

async function sendResults(data: EmailResults): Promise<void> {
  const htmlBody = emailTemplate(data);
  const attachments = data.pdfBuffer
    ? [
        {
          filename: `Relatorio-Aptidao-${data.name.replace(/\s+/g, '-')}.pdf`,
          content: data.pdfBuffer,
        },
      ]
    : [];

  await sendEmail({
    to: data.to,
    subject: 'Relatório de Aptidão - Masterclass da Carreira Tech',
    htmlBody,
    attachments,
  });
}

export { sendEmail, sendResults };
