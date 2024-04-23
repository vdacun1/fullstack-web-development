const AccessoryService = require('@src/domain/services/AccessoryService');
const AccessoryRepository = require('@src/domain/repositories/AccessoryRepository');

jest.mock('@src/domain/repositories/AccessoryRepository');

describe('AccessoryService', () => {
  let accessoryRepositoryMock;

  beforeEach(() => {
    accessoryRepositoryMock = {
      find: jest.fn(),
    };
    AccessoryRepository.mockImplementation(() => accessoryRepositoryMock);
  });

  test('should return a list of accessories', async () => {
    const mockAccessories = [
      { id: '1', name: 'Accessory 1' },
      { id: '2', name: 'Accessory 2' },
    ];

    accessoryRepositoryMock.find.mockResolvedValue(mockAccessories);

    const result = await AccessoryService.list();

    expect(result).toEqual(mockAccessories);
  });

  test('should throw an error if there is a server error', async () => {
    accessoryRepositoryMock.find.mockRejectedValue(new Error('Server error'));

    await expect(AccessoryService.list()).rejects.toThrow('Server error');
  });
});
