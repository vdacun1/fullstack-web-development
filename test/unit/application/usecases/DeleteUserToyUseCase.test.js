const UserToyService = require('@src/domain/services/UserToyService');
const HttpStatus = require('@src/application/constants/HttpStatus');
const DeleteUserToyUseCase = require('@src/application/usecases/DeleteUserToyUseCase');
const ErrorType = require('@src/domain/constants/ErrorType');

jest.mock('@src/domain/services/UserToyService');

describe('DeleteUserToyUseCase', () => {
  let mockResponse;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
  });

  test('should return HttpStatus.NO_CONTENT when the deletion is successful', async () => {
    const mockData = { user: '1', id: 'toyId' };

    UserToyService.delete.mockResolvedValue({ message: 'User toy deleted' });

    await DeleteUserToyUseCase.handle(mockResponse, mockData);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NO_CONTENT);
    expect(mockResponse.send).toHaveBeenCalled();
  });

  test('should return HttpStatus.OK when occurs a decrement instead of deletion', async () => {
    const mockData = { user: '1', id: 'toyId' };
    const mockResult = { message: 'User toy not found' };

    UserToyService.delete.mockResolvedValue(mockResult);

    await DeleteUserToyUseCase.handle(mockResponse, mockData);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(mockResponse.send).toHaveBeenCalledWith(mockResult);
  });

  test('should return HttpStatus.NOT_FOUND when the entity is not found', async () => {
    const mockData = { user: '1', id: 'toyId' };

    const error = new Error();
    error.type = ErrorType.EntityNotFound;
    UserToyService.delete.mockRejectedValue(error);

    await DeleteUserToyUseCase.handle(mockResponse, mockData);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(mockResponse.send).toHaveBeenCalledWith({
      status: HttpStatus.NOT_FOUND,
      message: error.message,
    });
  });

  test('should return an error when the deletion fails', async () => {
    const mockData = { user: '1', id: 'toyId' };

    UserToyService.delete.mockRejectedValue(new Error());

    await DeleteUserToyUseCase.handle(mockResponse, mockData);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.SERVER_ERROR);
  });
});
