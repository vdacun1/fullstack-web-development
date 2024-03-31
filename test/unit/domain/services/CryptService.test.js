const bcrypt = require("bcrypt");
const CryptService = require("@src/domain/services/CryptService");
const HttpStatus = require("@src/application/constants/HttpStatus");

jest.mock("bcrypt");
describe("CryptService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("hash", () => {
    test("should return hashed data when bcrypt.hash is successful", async () => {
      const data = "testData";
      const hashedData = "hashedData";
      bcrypt.hash.mockResolvedValue(hashedData);

      const result = await CryptService.hash(data);

      expect(result).toEqual(hashedData);
      expect(bcrypt.hash).toHaveBeenCalledWith(data, 10);
    });
  });

  describe("compare", () => {
    test("should return true when bcrypt.compare is successful", async () => {
      const data = "testData";
      const hashedData = "hashedData";
      bcrypt.compare.mockResolvedValue(true);

      const result = await CryptService.compare(data, hashedData);

      expect(result).toEqual(true);
      expect(bcrypt.compare).toHaveBeenCalledWith(data, hashedData);
    });

    test("should return false when bcrypt.compare is unsuccessful", async () => {
      const data = "testData";
      const hashedData = "hashedData";
      bcrypt.compare.mockResolvedValue(false);

      const result = await CryptService.compare(data, hashedData);

      expect(result).toEqual(false);
      expect(bcrypt.compare).toHaveBeenCalledWith(data, hashedData);
    });
  });
});
