const ToyService = require('@src/domain/services/ToyService');
const HttpStatus = require('@src/application/constants/HttpStatus');
const GetToysUseCase = require('@src/application/usecases/GetToysUseCase');

jest.mock('@src/domain/services/ToyService');

describe('GetToysUseCase', () => {
  let mockResponse;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
  });

  test('should return a list of toys when the request is successful', async () => {
    const mockToys = [
      { id: 1, name: 'Toy 1' },
      { id: 2, name: 'Toy 2' },
    ];
    ToyService.list.mockResolvedValue(mockToys);

    await GetToysUseCase.handle({}, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(mockResponse.send).toHaveBeenCalledWith(mockToys);
  });

  test('should return a server error when the request fails', async () => {
    const mockError = new Error('Error while getting toys');
    ToyService.list.mockRejectedValue(mockError);

    await GetToysUseCase.handle({}, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.SERVER_ERROR);
    expect(mockResponse.send).toHaveBeenCalledWith({
      status: HttpStatus.SERVER_ERROR,
      message: 'Error while getting toys',
    });
  });
});
