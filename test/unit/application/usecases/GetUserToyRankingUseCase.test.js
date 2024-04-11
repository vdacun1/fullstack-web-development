const UserToyService = require('@src/domain/services/UserToyService');
const HttpStatus = require('@src/application/constants/HttpStatus');
const GetUserToyRankingUseCase = require('@src/application/usecases/GetUserToyRankingUseCase');

jest.mock('@src/domain/services/UserToyService');

describe('GetUserToyRankingUseCase', () => {
  let mockResponse;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
  });

  test('should return a user toy ranking when the request is successful', async () => {
    const mockUserToyRanking = [
      { toy: 'Toy 1', color: 'Color 1', accessory: 'Accessory 1', total: 10 },
      { toy: 'Toy 2', color: 'Color 2', accessory: 'Accessory 2', total: 5 },
    ];
    UserToyService.ranking.mockResolvedValue(mockUserToyRanking);

    await GetUserToyRankingUseCase.handle({}, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(mockResponse.send).toHaveBeenCalledWith(mockUserToyRanking);
  });

  test('should return a server error when the request fails', async () => {
    const mockError = new Error('Error while getting user toy ranking');
    UserToyService.ranking.mockRejectedValue(mockError);

    await GetUserToyRankingUseCase.handle({}, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.SERVER_ERROR);
    expect(mockResponse.send).toHaveBeenCalledWith({
      status: HttpStatus.SERVER_ERROR,
      message: 'Error while getting user toy ranking',
    });
  });
});
