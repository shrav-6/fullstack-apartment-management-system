const userService = require("../../Data/Users");
const { users } = require("../../Models");
const bcrypt = require("bcrypt");

jest.mock("../../Models");
jest.mock("bcrypt");

describe('getUserByEmail', () => {
  it('should retrieve a user by email', async () => {
    const userEmail = 'test@example.com';
    const mockUser = { id: 1, userName: 'TestUser', email: userEmail, role: 'User' };
    users.findOne.mockResolvedValue(mockUser);

    const result = await userService.getUserByEmail(userEmail);
    expect(result).toEqual(mockUser);
  });

  it('should return null if no user is found for the given email', async () => {
    const userEmail = 'nonexistent@example.com';
    users.findOne.mockResolvedValue(null);

    const result = await userService.getUserByEmail(userEmail);
    expect(result).toBeNull();
  });

  it('should handle errors during retrieval', async () => {
    const userEmail = 'test@example.com';
    users.findOne.mockRejectedValue(new Error('Database error'));

    await expect(userService.getUserByEmail(userEmail)).rejects.toThrow('Database error');
  });
});

describe('createUser', () => {
  it('should create a new user', async () => {
    const userData = {
      userName: 'NewUser',
      email: 'newuser@example.com',
      password: 'password123',
      role: 'User',
    };

    const hashedPassword = 'hashedPassword123';
    bcrypt.hash.mockResolvedValue(hashedPassword);

    const mockCreatedUser = { id: 2, ...userData, password: hashedPassword };
    users.create.mockResolvedValue(mockCreatedUser);

    const result = await userService.createUser(userData);
    expect(result).toEqual(mockCreatedUser);
  });

  it('should handle errors during user creation', async () => {
    const userData = {
      userName: 'NewUser',
      email: 'newuser@example.com',
      password: 'password123',
      role: 'User',
    };

    bcrypt.hash.mockResolvedValue('hashedPassword123');
    users.create.mockRejectedValue(new Error('Database error'));

    await expect(userService.createUser(userData)).rejects.toThrow('Database error');
  });
});
