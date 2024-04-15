const UserService = require('@src/domain/services/UserService');
const HttpStatus = require('@src/application/constants/HttpStatus');
const RegisterUseCase = require('@src/application/usecases/RegisterUseCase');
const Config = require('@src/infrastructure/Config');
const CacheService = require('@src/domain/services/CacheService');
const MailService = require('@src/domain/services/MailService');

jest.mock('@src/infrastructure/Config');
jest.mock('@src/domain/services/CacheService');
jest.mock('@src/domain/services/MailService');
jest.mock('@src/domain/services/UserService');
describe('RegisterUseCase', () => {
  let mockResponse;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
  });

  test('should register a user successfully', async () => {
    const mockData = { email: 'test@test.com', password: 'password' };
    UserService.register.mockResolvedValue(mockData);

    await RegisterUseCase.handle(mockResponse, mockData);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CREATED);
    expect(mockResponse.send).toHaveBeenCalledWith({
      status: HttpStatus.CREATED,
      message: `User registered successfully: ${mockData.email}`,
    });
  });

  test('should handle user already exists error', async () => {
    const mockData = { email: 'test@test.com', password: 'password' };
    UserService.register.mockRejectedValue({ code: 11000 });

    await RegisterUseCase.handle(mockResponse, mockData);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CONFLICT);
    expect(mockResponse.send).toHaveBeenCalledWith({
      status: HttpStatus.CONFLICT,
      message: 'User already exists',
    });
  });

  test('should handle server error', async () => {
    const mockData = { email: 'test@test.com', password: 'password' };
    UserService.register.mockRejectedValue(new Error());

    await RegisterUseCase.handle(mockResponse, mockData);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.SERVER_ERROR);
    expect(mockResponse.send).toHaveBeenCalledWith({
      status: HttpStatus.SERVER_ERROR,
      message: 'Error while registering user',
    });
  });

  test('should handle error when sending verification email fails', async () => {
    const mockData = { email: 'test@test.com', password: 'password' };
    UserService.register.mockResolvedValue(mockData);
    Config.verify_email = true;
    CacheService.groupSet.mockResolvedValue();
    MailService.sendConfirmationEmail.mockRejectedValue(new Error());

    await RegisterUseCase.handle(mockResponse, mockData);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.SERVER_ERROR);
    expect(mockResponse.send).toHaveBeenCalledWith({
      status: HttpStatus.SERVER_ERROR,
      message: 'Error while registering user',
    });
  });

  test('should send a confirmation email when user registration is successful and email verification is enabled', async () => {
    const mockData = {
      _id: '12345',
      email: 'test@test.com',
      password: 'password',
    };
    UserService.register.mockResolvedValue(mockData);
    Config.verify_email = true;
    CacheService.groupSet.mockResolvedValue();
    MailService.sendConfirmationEmail.mockResolvedValue();

    await RegisterUseCase.handle(mockResponse, mockData);

    expect(MailService.sendConfirmationEmail).toHaveBeenCalledWith(
      mockData.email,
      expect.any(String),
    );
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CREATED);
    expect(mockResponse.send).toHaveBeenCalledWith({
      status: HttpStatus.CREATED,
      message: `User registered successfully: ${mockData.email}`,
    });
  });
});
