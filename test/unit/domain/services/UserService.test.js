const UserService = require("@src/domain/services/UserService");

const HttpStatus = require("@src/domain/constants/HttpStatus");
const UserRepository = require("../../../../src/domain/repositories/UserRepository");

jest.mock("@src/domain/repositories/UserRepository");

describe("UserService", () => {
  let userRepositoryMock;

  beforeEach(() => {
    userRepositoryMock = {
      create: jest.fn(),
    };
    UserRepository.mockImplementation(() => userRepositoryMock);
  });

  it("should register a user successfully", async () => {
    userRepositoryMock.create.mockResolvedValue({});

    const result = await UserService.register({
      email: "test@test.com",
      password: "password",
    });

    expect(result).toEqual({
      status: HttpStatus.CREATED,
      message: "User registered successfully",
    });
  });

  it("should throw an error if user already exists", async () => {
    userRepositoryMock.create.mockRejectedValue({ code: 11000 });

    await expect(
      UserService.register({ email: "test@test.com", password: "password" }),
    ).rejects.toEqual({
      status: HttpStatus.CONFLICT,
      message: "User already exists",
    });
  });

  it("should throw an error if there is a server error", async () => {
    userRepositoryMock.create.mockRejectedValue({ code: 500 });

    await expect(
      UserService.register({ email: "test@test.com", password: "password" }),
    ).rejects.toEqual({
      status: HttpStatus.SERVER_ERROR,
      message: "Error while registering user",
    });
  });
});
