const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const {
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS,
} = process.env;

const oauth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  OAUTH_PLAYGROUND
);

// send mail
const sendEmail = (userName, to, url, action) => {
  // action = register or resetPassword
  oauth2Client.setCredentials({
    refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
  });

  const accessToken = oauth2Client.getAccessToken();
  /*const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: SENDER_EMAIL_ADDRESS,
      clientId: MAILING_SERVICE_CLIENT_ID,
      clientSecret: MAILING_SERVICE_CLIENT_SECRET,
      refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
      accessToken,
    }
  });*/

  const smtpTransport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: { 
      user: '******', 
      pass: '*******' 
    },
  });


  // verify connection configuration
  smtpTransport.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });


  const mailOptions =
    action == "register"
      ? {
          from: SENDER_EMAIL_ADDRESS,
          to: to,
          subject: "Ágora: verificar correo electrónico",
          html: `
          <div style="max-width: 700px; margin:auto; border: 10px solid #000000; padding: 50px 20px; font-size: 110%;">
          <h1 style="text-align: center; text-transform: uppercase; color: black;">Ágora</h1>
          <h3 style="text-align: center; text-transform: uppercase; color: black;">Verificar correo</h3>
            <p><span style="font-weight:bold">Estimado/a ${userName}</span><br><br> 
            Para completar su registro en Ágora verifique su correo electrónico haciendo clic en el siguiente botón
            </p>
            <div style="display:flex; justify-content:center; margin:auto" > <a href=${url} style="background: #FFCC02; text-decoration: none; border-radius:10px; color: black; justify-content:center; padding: 10px 20px; margin: auto;font-weight:bold">Verificar correo electrónico</a></div>
            <p>Si el botón no funciona, puede dar clic en el siguiente link :</p>
            <div>${url}</div>
            <p>Tenga en cuenta que este enlace caducará en 24 horas.</p>
            <img src="https://drive.google.com/uc?export=view&id=11c9kZxdoQd8Qa6jZNEwTMTLSfUd1fu5n" style="max-width:700px; margin:auto" alt="Prográmate Academy"/>
            </div>

        `,
        }
      : action == "resetPassword"
      ? {
          from: SENDER_EMAIL_ADDRESS,
          to: to,
          subject: "Ágora: restablecer contraseña",
          html: `
          <div style="max-width: 700px; margin:auto; border: 10px solid #000000; padding: 50px 20px; font-size: 110%;">
          <h1 style="text-align: center; text-transform: uppercase; color: black;">Ágora</h1>
          <h3 style="text-align: center; text-transform: uppercase; color: black;">Restablecer contraseña</h3>
          <p><span style="font-weight:bold">Estimado/a ${userName}</span><br><br>
          <p>Hemos recibido una solicitud para restablecer su contraseña en el sistema de gestión de aprendizaje Ágora de Prográmate Academy. <br>Presione el botón para continuar con el proceso.
          </p>
          
          <div style="display:flex; justify-content:center; margin:auto" > <a href=${url} style="background: #FFCC02; text-decoration: none; border-radius:10px; color: black; justify-content:center; padding: 10px 20px; margin: auto; font-weight:bold">Restablecer contraseña</a></div>
      
          <p>Si el botón no funciona, puede dar click en el siguiente link :</p>
      
          <div>${url}</div>
          <p> Tenga en cuenta que este enlace caducará en 24 horas.</p>
          <img style="max-width:700px; margin:auto" src="https://drive.google.com/uc?export=view&id=11c9kZxdoQd8Qa6jZNEwTMTLSfUd1fu5n" alt="Prográmate Academy"/>
          </div>
        `,
        }
      : null;

  smtpTransport.sendMail(mailOptions, (err, infor) => {
    console.debug(err, 'email')
    if (err) return err;
    return infor;
  });
};

module.exports = sendEmail;
