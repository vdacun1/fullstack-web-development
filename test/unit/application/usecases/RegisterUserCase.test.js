const UserService = require("@src/domain/services/UserService");
const HttpStatus = require("@src/application/constants/HttpStatus");
const RegisterUseCase = require("@src/application/usecases/RegisterUseCase");

jest.mock("@src/domain/services/UserService");
describe("RegisterUseCase", () => {
  let mockResponse;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
  });

  test("should register a user successfully", async () => {
    const mockData = { email: "test@test.com", password: "password" };
    UserService.register.mockResolvedValue(mockData);

    await RegisterUseCase.handle(mockResponse, mockData);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CREATED);
    expect(mockResponse.send).toHaveBeenCalledWith({
      status: HttpStatus.CREATED,
      message: `User registered successfully: ${mockData.email}`,
    });
  });

  test("should handle user already exists error", async () => {
    const mockData = { email: "test@test.com", password: "password" };
    UserService.register.mockRejectedValue({ code: 11000 });

    await RegisterUseCase.handle(mockResponse, mockData);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CONFLICT);
    expect(mockResponse.send).toHaveBeenCalledWith({
      status: HttpStatus.CONFLICT,
      message: "User already exists",
    });
  });

  test("should handle server error", async () => {
    const mockData = { email: "test@test.com", password: "password" };
    UserService.register.mockRejectedValue(new Error());

    await RegisterUseCase.handle(mockResponse, mockData);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.SERVER_ERROR);
    expect(mockResponse.send).toHaveBeenCalledWith({
      status: HttpStatus.SERVER_ERROR,
      message: "Error while registering user",
    });
  });
});
