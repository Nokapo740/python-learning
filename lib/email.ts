import nodemailer from 'nodemailer'

// Создаем транспорт для отправки email
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
  secure: false, // true для 465, false для других портов
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

export async function sendOTPEmail(email: string, code: string, name?: string) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Код подтверждения PyLearn',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
              background: linear-gradient(to bottom, #0f172a, #1e293b);
              margin: 0;
              padding: 40px 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: rgba(255, 255, 255, 0.05);
              backdrop-filter: blur(10px);
              border-radius: 20px;
              padding: 40px;
              border: 1px solid rgba(255, 255, 255, 0.1);
            }
            .logo {
              text-align: center;
              font-size: 32px;
              font-weight: bold;
              background: linear-gradient(to right, #0ea5e9, #d946ef);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              margin-bottom: 30px;
            }
            .greeting {
              color: #e2e8f0;
              font-size: 20px;
              margin-bottom: 20px;
            }
            .message {
              color: #cbd5e1;
              line-height: 1.6;
              margin-bottom: 30px;
            }
            .otp-container {
              background: linear-gradient(to right, #0ea5e9, #d946ef);
              border-radius: 12px;
              padding: 30px;
              text-align: center;
              margin: 30px 0;
            }
            .otp-code {
              font-size: 48px;
              font-weight: bold;
              letter-spacing: 10px;
              color: white;
              font-family: 'Courier New', monospace;
            }
            .otp-label {
              color: rgba(255, 255, 255, 0.8);
              font-size: 14px;
              margin-top: 10px;
            }
            .warning {
              background: rgba(239, 68, 68, 0.1);
              border: 1px solid rgba(239, 68, 68, 0.3);
              border-radius: 8px;
              padding: 15px;
              color: #fca5a5;
              font-size: 14px;
              margin-top: 20px;
            }
            .footer {
              text-align: center;
              color: #64748b;
              font-size: 14px;
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid rgba(255, 255, 255, 0.1);
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">🐍 PyLearn</div>
            
            <div class="greeting">
              Привет${name ? `, ${name}` : ''}!
            </div>
            
            <div class="message">
              Вы получили это письмо, потому что запросили код подтверждения для входа в PyLearn.
              Используйте код ниже для завершения регистрации или входа:
            </div>
            
            <div class="otp-container">
              <div class="otp-code">${code}</div>
              <div class="otp-label">Ваш код подтверждения</div>
            </div>
            
            <div class="message">
              Код действителен в течение <strong>10 минут</strong>.
            </div>
            
            <div class="warning">
              ⚠️ Если вы не запрашивали этот код, просто проигнорируйте это письмо.
              Никому не сообщайте этот код!
            </div>
            
            <div class="footer">
              <p>С уважением,<br>Команда PyLearn</p>
              <p style="margin-top: 20px; font-size: 12px;">
                Это автоматическое письмо, пожалуйста, не отвечайте на него.
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Ошибка отправки email:', error)
    return { success: false, error }
  }
}

// Генерация 6-значного OTP кода
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

