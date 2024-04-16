const MailService = require('@src/domain/services/MailService');
const { MailerSend, EmailParams, Sender, Recipient } = require('mailersend');

jest.mock('mailersend', () => {
  return {
    MailerSend: jest.fn().mockImplementation(() => {
      return {
        email: {
          send: async () => {
            return 'Email sent';
          },
        },
      };
    }),
    EmailParams: jest.fn().mockImplementation(() => {
      return {
        setFrom: jest.fn().mockReturnThis(),
        setTo: jest.fn().mockReturnThis(),
        setSubject: jest.fn().mockReturnThis(),
        setHtml: jest.fn().mockReturnThis(),
      };
    }),
    Sender: jest.fn(),
    Recipient: jest.fn(),
  };
});

describe('MailService', () => {
  test('should send a confirmation email successfully', async () => {
    const destination = 'test@test.com';
    const confirmationCode = '123456';

    const result = await MailService.sendConfirmationEmail(
      destination,
      confirmationCode,
    );

    expect(result).toStrictEqual({});
  });
});
