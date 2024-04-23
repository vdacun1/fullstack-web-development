const CacheService = require('@src/domain/services/CacheService');

const ErrorType = require('@src/domain/constants/ErrorType');
const UserToyRepository = require('@src/domain/repositories/UserToyRepository');
const UserRepository = require('@src/domain/repositories/UserRepository');
const ToyRepository = require('@src/domain/repositories/ToyRepository');
const ColorRepository = require('@src/domain/repositories/ColorRepository');
const AccessoryRepository = require('@src/domain/repositories/AccessoryRepository');
const UserToyService = require('@src/domain/services/UserToyService');

jest.mock('@src/domain/services/CacheService');

jest.mock('@src/domain/repositories/UserToyRepository');
jest.mock('@src/domain/repositories/UserRepository');
jest.mock('@src/domain/repositories/ToyRepository');
jest.mock('@src/domain/repositories/ColorRepository');
jest.mock('@src/domain/repositories/AccessoryRepository');

describe('UserToyService', () => {
  let userToyRepositoryMock;
  let userRepositoryMock;
  let toyRepositoryMock;
  let colorRepositoryMock;
  let accessoryRepositoryMock;

  beforeEach(() => {
    userToyRepositoryMock = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      getUserLastItemsCreated: jest.fn(),
    };
    userRepositoryMock = {
      findOne: jest.fn(),
    };
    toyRepositoryMock = {
      findOne: jest.fn(),
    };
    colorRepositoryMock = {
      findOne: jest.fn(),
    };
    accessoryRepositoryMock = {
      findOne: jest.fn(),
    };

    UserToyRepository.mockImplementation(() => userToyRepositoryMock);
    UserRepository.mockImplementation(() => userRepositoryMock);
    ToyRepository.mockImplementation(() => toyRepositoryMock);
    ColorRepository.mockImplementation(() => colorRepositoryMock);
    AccessoryRepository.mockImplementation(() => accessoryRepositoryMock);

    CacheService.get = jest.fn();
    CacheService.set = jest.fn();
    CacheService.del = jest.fn();

    toyRepositoryMock.findOne = jest.fn().mockResolvedValue({ name: 'toy1' });
    colorRepositoryMock.findOne = jest
      .fn()
      .mockResolvedValue({ name: 'color1' });
    accessoryRepositoryMock.findOne = jest
      .fn()
      .mockResolvedValue({ name: 'accessory1' });
  });

  test('should return a list of user toys', async () => {
    const mockUserToys = [
      { toy: 'toy1', color: 'color1', accessory: 'accessory1', quantity: 1 },
    ];

    userToyRepositoryMock.getUserLastItemsCreated.mockResolvedValue(
      mockUserToys,
    );

    const result = await UserToyService.list('1');

    expect(result).toEqual(mockUserToys);
  });

  test('should throw an error when toy is not found', async () => {
    const mockUserToys = [
      { toy: '1', color: '1', accessory: '1', quantity: 1 },
    ];

    userToyRepositoryMock.getUserLastItemsCreated.mockResolvedValue(
      mockUserToys,
    );
    toyRepositoryMock.findOne.mockResolvedValue(null);

    await expect(UserToyService.list('1')).rejects.toEqual({
      error: ErrorType.EntityNotFound,
      message:
        'Some entities were not found. Please contact support. Error code: DS-UTS-GEI',
      errors: {
        toy: '1 not found',
      },
    });
  });

  test('should throw an error when color is not found', async () => {
    const mockUserToys = [
      { toy: '1', color: '1', accessory: '1', quantity: 1 },
    ];

    userToyRepositoryMock.getUserLastItemsCreated.mockResolvedValue(
      mockUserToys,
    );
    toyRepositoryMock.findOne.mockResolvedValue({ name: 'toy1' });
    colorRepositoryMock.findOne.mockResolvedValue(null);

    await expect(UserToyService.list('1')).rejects.toEqual({
      error: ErrorType.EntityNotFound,
      message:
        'Some entities were not found. Please contact support. Error code: DS-UTS-GEI',
      errors: {
        color: '1 not found',
      },
    });
  });

  test('should throw an error when accessory is not found', async () => {
    const mockUserToys = [
      { toy: '1', color: '1', accessory: '1', quantity: 1 },
    ];

    userToyRepositoryMock.getUserLastItemsCreated.mockResolvedValue(
      mockUserToys,
    );
    toyRepositoryMock.findOne.mockResolvedValue({ name: 'toy1' });
    colorRepositoryMock.findOne.mockResolvedValue({ name: 'color1' });
    accessoryRepositoryMock.findOne.mockResolvedValue(null);

    await expect(UserToyService.list('1')).rejects.toEqual({
      error: ErrorType.EntityNotFound,
      message:
        'Some entities were not found. Please contact support. Error code: DS-UTS-GEI',
      errors: {
        accessory: '1 not found',
      },
    });
  });

  test('should decrement the quantity of a user toy if quantity is more than 1', async () => {
    const mockUserToy = { _id: '1', user: '1', quantity: 2 };
    userToyRepositoryMock.findOne.mockResolvedValue(mockUserToy);
    userToyRepositoryMock.findOneAndUpdate = jest
      .fn()
      .mockResolvedValue(mockUserToy);

    const result = await UserToyService.delete('1', '1');

    expect(result).toEqual({ message: 'User toy quantity decremented' });
    expect(userToyRepositoryMock.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: '1' },
      {
        _id: '1',
        quantity: 1,
        user: '1',
      },
    );
  });

  test('should delete a user toy if quantity is 1', async () => {
    const mockUserToy = { _id: '1', user: '1', quantity: 1 };
    userToyRepositoryMock.findOne.mockResolvedValue(mockUserToy);
    userToyRepositoryMock.findOneAndDelete = jest
      .fn()
      .mockResolvedValue(mockUserToy);

    const result = await UserToyService.delete('1', '1');

    expect(result).toEqual({ message: 'User toy deleted' });
    expect(userToyRepositoryMock.findOneAndDelete).toHaveBeenCalledWith({
      _id: '1',
    });
  });

  test('should throw an error when user toy is not found', async () => {
    userToyRepositoryMock.findOne.mockResolvedValue(null);

    await expect(UserToyService.delete('1', '1')).rejects.toEqual({
      type: ErrorType.EntityNotFound,
      message: 'User toy not found',
    });
  });

  test('should throw an error when there is a server error', async () => {
    userToyRepositoryMock.findOne.mockRejectedValue(new Error('Server error'));

    await expect(UserToyService.delete('1', '1')).rejects.toEqual(
      new Error('Server error'),
    );
  });
});
