const Config = require('../../infrastructure/Config');

const ConfirmEmailBody = {
  build: (confirmationCode) => {
    return `
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <title>Fullstack Web Development - Confirmation Email</title>
          <style>
            body {
              font-family: Roboto-Regular,Helvetica,Arial,sans-serif;
              padding: 0;
              color: rgba(0,0,0,0.8);
              background-color: #eff6ff;
              font-size: 16px;
              margin: 1% 25%;
            }
            .email-container {
              margin: 0;
              padding: 0;
            }
            .header {
              background-color: #3b82f6;
              color: white;
              padding: 20px;
              text-align: center;
              font-size: 24px;
              border-radius: 10px 10px 0 0;
            }
            .content {
              margin: 0;
              padding: 5%;
              background-color: #dbeafe;
            }
            .footer {
              background-color: #1e3a8a;
              color: white;
              padding: 10px;
              text-align: center;
              font-size: 12px;
              border-radius: 0 0 10px 10px;
            }
            a {
              color: #1d4ed8;
              text-decoration: none;
              font-weight: bold;
            }
            .button {
              display: inline-block;
              color: white !important;
              background-color: #1d4ed8;
              padding: 10px 20px;
              border-radius: 5px;
              text-decoration: none;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>Bienvenido a Fullstack Web Development</h1>
            </div>
            <div class="content">
              <p>Hola,</p>
              <p>¡Gracias por registrarte en nuestra plataforma!</p>
              <p>Estamos emocionados de tenerte con nosotros. Para completar tu registro, por favor confirma tu dirección de correo electrónico haciendo clic en el siguiente botón:</p>
              <p><a href="http://localhost:${Config.port}/user/confirm-email/${confirmationCode}" class="button">Confirmar correo electrónico</a></p>
              <p>Si el botón no funciona, puedes copiar y pegar el siguiente enlace en tu navegador:</p>
              <p><a href="http://localhost:${Config.port}/user/confirm-email/${confirmationCode}">http://localhost:${Config.port}/user/confirm-email/${confirmationCode}</a></p>
              <p>Si tienes alguna pregunta, no dudes en contactarnos. ¡Estamos aquí para ayudarte!</p>
            </div>
            <div class="footer">
              <p>Este es un correo electrónico automático, por favor no respondas a este mensaje.</p>
              <p>© 2024 Fullstack Web Development. License GPL-3.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  },
};

module.exports = ConfirmEmailBody;
