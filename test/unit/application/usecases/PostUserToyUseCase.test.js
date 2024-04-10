const UserToyService = require('@src/domain/services/UserToyService');
const HttpStatus = require('@src/application/constants/HttpStatus');
const PostUserToyUseCase = require('@src/application/usecases/PostUserToyUseCase');
const ErrorType = require('@src/domain/constants/ErrorType');

jest.mock('@src/domain/services/UserToyService');

describe('PostUserToyUseCase', () => {
  let mockResponse;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
  });

  test('should return a user toy when the creation is successful', async () => {
    const mockData = {
      user: '1',
      toy: 'toy',
      color: 'color',
      accessory: 'accessory',
    };
    const mockUserToy = {
      userId: '1',
      toyName: 'toy',
      colorName: 'color',
      accessoryName: 'accessory',
      quantity: 1,
    };

    UserToyService.create.mockResolvedValue(mockUserToy);

    await PostUserToyUseCase.handle(mockResponse, mockData);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CREATED);
    expect(mockResponse.send).toHaveBeenCalledWith(mockUserToy);
  });

  test('should return HttpStatus.OK when the quantity is greater than 1', async () => {
    const mockData = {
      user: '1',
      toy: 'toy',
      color: 'color',
      accessory: 'accessory',
    };
    const mockUserToy = {
      userId: '1',
      toyName: 'toy',
      colorName: 'color',
      accessoryName: 'accessory',
      quantity: 2,
    };

    UserToyService.create.mockResolvedValue(mockUserToy);

    await PostUserToyUseCase.handle(mockResponse, mockData);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(mockResponse.send).toHaveBeenCalledWith(mockUserToy);
  });

  test('should return HttpStatus.NOT_FOUND when the entity is not found', async () => {
    const mockData = {
      user: '1',
      toy: 'toy',
      color: 'color',
      accessory: 'accessory',
    };

    const error = new Error();
    error.error = ErrorType.EntityNotFound;
    UserToyService.create.mockRejectedValue(error);

    await PostUserToyUseCase.handle(mockResponse, mockData);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(mockResponse.send).toHaveBeenCalledWith({
      status: HttpStatus.NOT_FOUND,
      message: error.message,
      errors: error.errors,
    });
  });

  test('should return an error when the creation fails', async () => {
    const mockData = {
      user: '1',
      toy: 'toy',
      color: 'color',
      accessory: 'accessory',
    };

    UserToyService.create.mockRejectedValue(new Error());

    await PostUserToyUseCase.handle(mockResponse, mockData);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.SERVER_ERROR);
    expect(mockResponse.send).toHaveBeenCalledWith({
      status: HttpStatus.SERVER_ERROR,
      message: 'Error while creating user toy',
    });
  });
});
