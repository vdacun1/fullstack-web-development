const UserService = require('@src/domain/services/UserService');

const UserRepository = require('@src/domain/repositories/UserRepository');

jest.mock('@src/domain/repositories/UserRepository');

describe('UserService', () => {
  let userRepositoryMock;

  beforeEach(() => {
    userRepositoryMock = {
      create: jest.fn(),
    };
    UserRepository.mockImplementation(() => userRepositoryMock);
  });

  test('should register a user successfully', async () => {
    userRepositoryMock.create.mockResolvedValue({});

    const result = await UserService.register({
      email: 'test@test.com',
      password: 'password',
    });

    expect(result).toEqual({});
  });

  test('should throw an error if user already exists', async () => {
    userRepositoryMock.create.mockRejectedValue({ code: 11000 });

    await expect(
      UserService.register({ email: 'test@test.com', password: 'password' }),
    ).rejects.toEqual({ code: 11000 });
  });

  test('should throw an error if there is a server error', async () => {
    userRepositoryMock.create.mockRejectedValue({ code: 500 });

    await expect(
      UserService.register({ email: 'test@test.com', password: 'password' }),
    ).rejects.toEqual({ code: 500 });
  });
});
