const UserService = require('@src/domain/services/UserService');
const HttpStatus = require('@src/application/constants/HttpStatus');
const LoginUseCase = require('@src/application/usecases/LoginUseCase');
const CryptService = require('@src/domain/services/CryptService');
const JWTService = require('@src/domain/services/JWTService');

jest.mock('@src/domain/services/UserService');

describe('LoginUseCase', () => {
  let mockResponse;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
  });

  test('should return a token when the login is successful', async () => {
    const hashedPassword = await CryptService.hash('password');

    const mockUser = { _id: 1, password: hashedPassword };
    const mockData = { email: 'test@test.com', password: 'password' };

    UserService.getUserByEmail.mockResolvedValue(mockUser);

    await LoginUseCase.handle(mockResponse, mockData);

    const response = mockResponse.send.mock.calls[0][0];
    const decodedToken = JWTService.decode(response.token);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(decodedToken.user).toEqual(mockUser._id);
    expect(response).toEqual(
      expect.objectContaining({
        status: HttpStatus.OK,
        message: 'Login success',
        token: expect.any(String),
      }),
    );
  });

  test('should return an error when the login fails', async () => {
    const hashedPassword = await CryptService.hash('password');

    const mockUser = { _id: 1, password: hashedPassword };
    const mockData = { email: 'test@test.com', password: 'wrongPassword' };

    UserService.getUserByEmail.mockResolvedValue(mockUser);

    await LoginUseCase.handle(mockResponse, mockData);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.UNAUTHORIZED);
    expect(mockResponse.send).toHaveBeenCalledWith({
      status: HttpStatus.UNAUTHORIZED,
      message: 'Wrong email or password',
    });
  });
});
