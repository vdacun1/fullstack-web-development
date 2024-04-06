const UserToyService = require('@src/domain/services/UserToyService');
const HttpStatus = require('@src/application/constants/HttpStatus');
const GetUserToysUseCase = require('@src/application/usecases/GetUserToysUseCase');

jest.mock('@src/domain/services/UserToyService');

describe('GetUserToysUseCase', () => {
  let mockResponse;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
  });

  test('should return a list of user toys when the request is successful', async () => {
    const mockUserToys = [
      { id: 1, name: 'Toy 1', userId: 1 },
      { id: 2, name: 'Toy 2', userId: 1 },
    ];
    UserToyService.list.mockResolvedValue(mockUserToys);

    await GetUserToysUseCase.handle(mockResponse, { user: 1 });

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(mockResponse.send).toHaveBeenCalledWith(mockUserToys);
  });

  test('should return a server error when the request fails', async () => {
    const mockError = new Error('Error while getting user toys');
    UserToyService.list.mockRejectedValue(mockError);

    await GetUserToysUseCase.handle(mockResponse, { user: 1 });

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.SERVER_ERROR);
    expect(mockResponse.send).toHaveBeenCalledWith({
      status: HttpStatus.SERVER_ERROR,
      message: 'Error while getting user toys',
    });
  });
});
