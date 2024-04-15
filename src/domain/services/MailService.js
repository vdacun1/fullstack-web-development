const Mailer = require('../../infrastructure/Mailer');
const ConfirmEmailBody = require('../constants/ConfirmEmailBody');

const MailService = {
  sendConfirmationEmail: async (destination, confirmationCode) => {
    const subject = 'Please confirm your email';
    const body = ConfirmEmailBody.build(confirmationCode);
    return await Mailer.send(subject, destination, body);
  },
};

module.exports = MailService;
