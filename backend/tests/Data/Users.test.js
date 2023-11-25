const userService = require("../../Data/Users");
const { users } = require("../../models");
const bcrypt = require("bcrypt");

jest.mock("../../models");
jest.mock("bcrypt");

/**
 * Test suite for 'getUserByEmail' functionality in the user service.
 */
describe('getUserByEmail', () => {
  
  /**
   * Test to verify the retrieval of a user by their email.
   * Checks if the service can successfully find a user with a specific email address.
   */
  it('should retrieve a user by email', async () => {
    const userEmail = 'test@example.com';
    const mockUser = { id: 1, userName: 'TestUser', email: userEmail, role: 'User' };
    users.findOne.mockResolvedValue(mockUser);

    const result = await userService.getUserByEmail(userEmail);
    expect(result).toEqual(mockUser);
  });
 
   /**
   * Test to verify the behavior when no user is found for a given email.
   * Ensures that the service returns null if the email does not match any user.
   */
  it('should return null if no user is found for the given email', async () => {
    const userEmail = 'nonexistent@example.com';
    users.findOne.mockResolvedValue(null);

    const result = await userService.getUserByEmail(userEmail);
    expect(result).toBeNull();
  });
  
  /**
   * Test to handle errors during the retrieval of a user by email.
   * Verifies that the function correctly throws an error in case of database issues.
   */

  it('should handle errors during retrieval', async () => {
    const userEmail = 'test@example.com';
    users.findOne.mockRejectedValue(new Error('Database error'));

    await expect(userService.getUserByEmail(userEmail)).rejects.toThrow('Database error');
  });
});

/**
 * Test suite for 'createUser' functionality in the user service.
 */
describe('createUser', () => {

   /**
   * Test to verify the creation of a new user.
   * Checks if the service can successfully create a user with given details, including hashed password.
   */
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

   /**
   * Test to handle errors during the user creation process.
   * Verifies that the function correctly throws an error in case of database issues.
   */
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
