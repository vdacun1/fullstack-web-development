const ColorService = require('@src/domain/services/ColorService');
const HttpStatus = require('@src/application/constants/HttpStatus');
const GetColorsUseCase = require('@src/application/usecases/GetColorsUseCase');

jest.mock('@src/domain/services/ColorService');

describe('GetColorsUseCase', () => {
  let mockResponse;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
  });

  test('should return a list of colors when the request is successful', async () => {
    const mockColors = [
      { id: 1, name: 'Color 1' },
      { id: 2, name: 'Color 2' },
    ];
    ColorService.list.mockResolvedValue(mockColors);

    await GetColorsUseCase.handle({}, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(mockResponse.send).toHaveBeenCalledWith(mockColors);
  });

  test('should return a server error when the request fails', async () => {
    const mockError = new Error('Error while getting colors');
    ColorService.list.mockRejectedValue(mockError);

    await GetColorsUseCase.handle({}, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.SERVER_ERROR);
    expect(mockResponse.send).toHaveBeenCalledWith({
      status: HttpStatus.SERVER_ERROR,
      message: 'Error while getting colors',
    });
  });
});
