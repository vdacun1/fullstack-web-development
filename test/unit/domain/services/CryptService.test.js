const bcrypt = require("bcrypt");
const CryptService = require("@src/domain/services/CryptService");
const HttpStatus = require("@src/domain/constants/HttpStatus");

jest.mock("bcrypt");
describe("CryptService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("hash", () => {
    it("should return hashed data when bcrypt.hash is successful", async () => {
      const data = "testData";
      const hashedData = "hashedData";
      bcrypt.hash.mockResolvedValue(hashedData);

      const result = await CryptService.hash(data);

      expect(result).toEqual(hashedData);
      expect(bcrypt.hash).toHaveBeenCalledWith(data, 10);
    });

    it("should throw an error when bcrypt.hash fails", async () => {
      const data = "testData";
      const error = new Error("bcrypt error");
      bcrypt.hash.mockRejectedValue(error);

      await expect(CryptService.hash(data)).rejects.toEqual({
        status: HttpStatus.SERVER_ERROR,
        message: "Error while hashing password",
      });
      expect(bcrypt.hash).toHaveBeenCalledWith(data, 10);
    });
  });
});
