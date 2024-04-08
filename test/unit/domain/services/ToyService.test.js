const ToyRepository = require('@src/domain/repositories/ToyRepository');
const ToyService = require('@src/domain/services/ToyService');

jest.mock('@src/domain/repositories/ToyRepository');

describe('ToyService', () => {
  let toyRepositoryMock;

  beforeEach(() => {
    toyRepositoryMock = {
      find: jest.fn(),
    };
    ToyRepository.mockImplementation(() => toyRepositoryMock);
  });

  test('should return a list of toys', async () => {
    const mockToys = [
      { id: '1', name: 'Toy 1' },
      { id: '2', name: 'Toy 2' },
    ];

    toyRepositoryMock.find.mockResolvedValue(mockToys);

    const result = await ToyService.list();

    expect(result).toEqual(mockToys);
  });

  test('should throw an error if there is a server error', async () => {
    toyRepositoryMock.find.mockRejectedValue(new Error('Server error'));

    await expect(ToyService.list()).rejects.toThrow('Server error');
  });
});
