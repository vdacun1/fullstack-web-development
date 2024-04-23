const { MailerSend, EmailParams, Sender, Recipient } = require('mailersend');
const Config = require('./Config');
const { log } = require('./Logger');

const mailerSend = new MailerSend({
  apiKey: Config.mailersend.api_key,
});

const Mailer = {
  send: async (subject, destination, body) => {
    const sentFrom = new Sender(
      Config.mailersend.from_email,
      'Fullstack Web Development API',
    );

    const recipients = [new Recipient(destination, '')];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject(subject)
      .setHtml(body);

    mailerSend.email
      .send(emailParams)
      .then(() => {
        log.info(`Email has been sent successfully to ${destination}`);
      })
      .catch(() => {
        log.error(`Error sending email to ${destination}`);
      });

    return {};
  },
};

module.exports = Mailer;
