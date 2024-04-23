const MailService = require('@src/domain/services/MailService');

jest.mock('mailersend', () => {
  let shouldThrow = false;
  return {
    MailerSend: jest.fn().mockImplementation(() => {
      return {
        email: {
          send: async () => {
            if (shouldThrow) {
              throw new Error('Error sending email');
            }
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
    Recipient: jest.fn().mockImplementation((from) => {
      shouldThrow = from === 'throw';
    }),
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

  test('should send a confirmation email successfully', async () => {
    const destination = 'throw';
    const confirmationCode = '123456';

    const result = await MailService.sendConfirmationEmail(
      destination,
      confirmationCode,
    );

    expect(result).toStrictEqual({});
  });
});
