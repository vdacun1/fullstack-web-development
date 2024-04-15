const HttpStatus = require('@src/application/constants/HttpStatus');
const ConfirmEmailUseCase = require('@src/application/usecases/ConfirmEmailUseCase');
const CacheService = require('@src/domain/services/CacheService');
const UserService = require('@src/domain/services/UserService');

jest.mock('@src/domain/services/CacheService');
jest.mock('@src/domain/services/UserService');

describe('ConfirmEmailUseCase', () => {
  let mockResponse;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
  });

  test('should confirm email when the verification code is valid', async () => {
    const mockReq = {
      params: {
        email_verification_code: 'valid_code',
      },
    };

    CacheService.groupGet.mockResolvedValue('user_id');
    UserService.getEmailVerificationCodeByUserId.mockResolvedValue({
      email_verification_code: 'valid_code',
    });
    UserService.verifyEmail.mockResolvedValue();
    CacheService.groupDel.mockResolvedValue();

    await ConfirmEmailUseCase.handle(mockReq, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(mockResponse.send).toHaveBeenCalledWith({
      status: HttpStatus.OK,
      message: 'Email verified successfully',
    });
  });

  test('should return not found when the verification code is invalid', async () => {
    const mockReq = {
      params: {
        email_verification_code: 'invalid_code',
      },
    };

    CacheService.groupGet.mockResolvedValue(null);

    await ConfirmEmailUseCase.handle(mockReq, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(mockResponse.send).toHaveBeenCalledWith({
      status: HttpStatus.NOT_FOUND,
      message: 'Invalid email verification code',
    });
  });

  test('should return not found when the verification code is expired', async () => {
    const mockReq = {
      params: {
        email_verification_code: 'expired_code',
      },
    };

    CacheService.groupGet.mockResolvedValue('user_id');
    UserService.getEmailVerificationCodeByUserId.mockResolvedValue({
      email_verification_code: 'different_code',
    });

    await ConfirmEmailUseCase.handle(mockReq, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(mockResponse.send).toHaveBeenCalledWith({
      status: HttpStatus.NOT_FOUND,
      message: 'Verification code is expired',
    });
  });

  test('should return server error when an error occurs', async () => {
    const mockReq = {
      params: {
        email_verification_code: 'valid_code',
      },
    };

    CacheService.groupGet.mockRejectedValue(
      new Error('Error while getting user id'),
    );

    await ConfirmEmailUseCase.handle(mockReq, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.SERVER_ERROR);
    expect(mockResponse.send).toHaveBeenCalledWith({
      status: HttpStatus.SERVER_ERROR,
      message: 'Error while confirming email',
    });
  });
});
