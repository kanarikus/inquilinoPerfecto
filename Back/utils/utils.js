const sendgrid = require("@sendgrid/mail");

const sendConfirmationMail = async (email, link) => {
    sendgrid.setApiKey(process.env.EMAIL_API_KEY);

    const message = {
        to: email,
        from: 'tony_balu@hotmail.com',
        subject: 'Validate your account',
        text: `La dirección de verificación es: ${link}`,
        html: `
        <div>
          <h1> Valida tu registro </h1>
          <p> Si te has registrado en el sistema, accede al siguiente
          enlace para validar tu cuenta </p>

          ${link}
        </div>
      `,
    };

    // Enviar mensaje
    await sendgrid.send(message);
}

const sendRecoverPassword = async (email, link) => {
  sendgrid.setApiKey(process.env.EMAIL_API_KEY);

  const message = {
      to: email,
      from: 'tony_balu@hotmail.com',
      subject: 'Validate your account',
      text: `La dirección de verificación es: ${link}`,
      html: `
      <div>
        <h1> Valida tu registro </h1>
        <p> Si te has olvidado tu contraseña y pedido un reinicio
         de contraseña accede al link, si no ignora el mensaje </p>

        ${link}
      </div>
    `,
  };

  // Enviar mensaje
  await sendgrid.send(message);
}

const sendBookingMail = async(email,link) => {
  sendgrid.setApiKey(process.env.EMAIL_API_KEY);
  const message = {
    to: email,
    from: 'tony_balu@hotmail.com',
    subject:'Han solicitado una reserva!',
    text:`Responde a la solicitud de la reserva aquí => ${link}`,
    html:`
    <div>
      <h1>Responde a la nueva solicitud de reserva!</h1>
      <p>Has recibido una propuesta de alquiler a uno de tus pisos, entra para aceptar o declinar
      la solicitud!!</p>

      ${link}
    </div>
    `
  }
  await sendgrid.send(message);
}

module.exports = {
  sendBookingMail,
    sendConfirmationMail,
    sendRecoverPassword
}