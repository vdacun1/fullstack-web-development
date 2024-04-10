const ColorRepository = require('@src/domain/repositories/ColorRepository');
const ColorService = require('@src/domain/services/ColorService');

jest.mock('@src/domain/repositories/ColorRepository');

describe('ColorService', () => {
  let colorRepositoryMock;

  beforeEach(() => {
    colorRepositoryMock = {
      find: jest.fn(),
    };
    ColorRepository.mockImplementation(() => colorRepositoryMock);
  });

  test('should return a list of colors', async () => {
    const mockColors = [
      { id: '1', name: 'Color 1' },
      { id: '2', name: 'Color 2' },
    ];

    colorRepositoryMock.find.mockResolvedValue(mockColors);

    const result = await ColorService.list();

    expect(result).toEqual(mockColors);
  });

  test('should throw an error if there is a server error', async () => {
    colorRepositoryMock.find.mockRejectedValue(new Error('Server error'));

    await expect(ColorService.list()).rejects.toThrow('Server error');
  });
});
