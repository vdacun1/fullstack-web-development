const AccessoryService = require('@src/domain/services/AccessoryService');
const HttpStatus = require('@src/application/constants/HttpStatus');
const GetAccessoriesUseCase = require('@src/application/usecases/GetAccessoriesUseCase');

jest.mock('@src/domain/services/AccessoryService');

describe('GetAccessoriesUseCase', () => {
  let mockResponse;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
  });

  test('should return a list of accessories when the request is successful', async () => {
    const mockAccessories = [
      { id: 1, name: 'Accessory 1' },
      { id: 2, name: 'Accessory 2' },
    ];
    AccessoryService.list.mockResolvedValue(mockAccessories);

    await GetAccessoriesUseCase.handle({}, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(mockResponse.send).toHaveBeenCalledWith(mockAccessories);
  });

  test('should return a server error when the request fails', async () => {
    const mockError = new Error('Error while getting accessories');
    AccessoryService.list.mockRejectedValue(mockError);

    await GetAccessoriesUseCase.handle({}, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.SERVER_ERROR);
    expect(mockResponse.send).toHaveBeenCalledWith({
      status: HttpStatus.SERVER_ERROR,
      message: 'Error while getting accessories',
    });
  });
});
