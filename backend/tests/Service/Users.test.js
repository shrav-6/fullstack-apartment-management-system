const userService = require('../../service/Users');
const dataLayer = require("../../data/Users");
const { managers, buildings, tenants, guests } = require("../../models");

jest.mock("../../data/Users");
jest.mock("../../models");

/**
 * Test suite for 'signUpUser' function in the user service.
 * It tests the sign-up process for different user roles.
 */

describe('signUpUser', () => {
    /**
   * Test case for successfully signing up a new tenant user.
   * It checks if the service correctly creates a tenant profile.
   */
  it('should successfully create a new tenant user', async () => {
    dataLayer.getUserByEmail.mockResolvedValue(null);
    dataLayer.createUser.mockResolvedValue({ id: 1, userName: 'newUser', email: 'test@example.com' });
    buildings.findOne.mockResolvedValue({ id: 1, managerId: 2 });
    managers.findOne.mockResolvedValue({ id: 2 });
    tenants.create.mockResolvedValue({});

    const newUser = {
      userName: 'newUser',
      email: 'test@example.com',
      name: 'Test User',
      password: 'password123',
      role: 'Tenant',
      phoneNumber: '1234567890',
      address: '123 Street',
      buildingName: 'Building 1',
      apartmentNumber: '101',
    };

    const result = await userService.signUpUser(newUser);
    expect(result).toEqual({ success: true, data: 'User profile created successfully', user: expect.any(Object) });
  });
  it('should return an error if the email is already registered', async () => {
    const existingUser = { email: 'existing@example.com' };
    dataLayer.getUserByEmail.mockResolvedValue(existingUser);
  
    const newUser = {
      userName: 'newUser',
      email: 'existing@example.com',
 
    };
  
    const result = await userService.signUpUser(newUser);
    expect(result).toEqual({ success: false, error: "Email is already registered" });
  });


  it('should successfully create a new manager user', async () => {
    dataLayer.getUserByEmail.mockResolvedValue(null);
    dataLayer.createUser.mockResolvedValue({ id: 1, userName: 'managerUser', email: 'manager@example.com' });
    managers.create.mockResolvedValue({});
  
    const newUser = {
      role: 'Manager',
      
    };
  
    const result = await userService.signUpUser(newUser);
    expect(result).toEqual({ success: true, data: "User profile created successfully", user: expect.any(Object) });
  });
  it('should successfully create a new guest user', async () => {
    dataLayer.getUserByEmail.mockResolvedValue(null);
    dataLayer.createUser.mockResolvedValue({ id: 1, userName: 'guestUser', email: 'guest@example.com' });
    guests.create.mockResolvedValue({});
  
    const newUser = {
      role: 'Guest',
      // Other required fields...
    };
  
    const result = await userService.signUpUser(newUser);
    expect(result).toEqual({ success: true, data: "User profile created successfully", user: expect.any(Object) });
  });
  it('should return an error for an unspecified role', async () => {
    dataLayer.getUserByEmail.mockResolvedValue(null);
  
    const newUser = {
      role: '', // No role specified
      // Other required fields...
    };
  
    const result = await userService.signUpUser(newUser);
    expect(result).toEqual({ success: false, error: "Not successful, no specific roles" });
  });
  
  // Additional test cases for existing users, different roles, invalid building, etc.
});
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock("../../data/Users");
/**
 * Test suite for 'loginUser' function in the user service.
 * It tests the login process for users.
 */
describe('loginUser', () => {
    /**
   * Test case for successfully logging in a registered user.
   * It checks if the service correctly authenticates and generates a token.
   */
    it('should successfully log in a registered user', async () => {
      const mockUser = { id: 1, userName: 'user1', email: 'user1@example.com', password: 'hashedPassword', role: 'Tenant' };
      dataLayer.getUserByEmail.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      sign.mockReturnValue('mockToken');
  
      const loginCredentials = { email: 'user1@example.com', password: 'password123' };
  
      const result = await userService.loginUser(loginCredentials);
      expect(result).toEqual({
        success: true,
        token: 'mockToken',
        email: 'user1@example.com',
        id: 1,
        username: 'user1',
        role: 'Tenant',
      });
    });
  
    it('should return an error for non-registered user', async () => {
      dataLayer.getUserByEmail.mockResolvedValue(null);
      const loginCredentials = { email: 'user2@example.com', password: 'password123' };
  
      const result = await userService.loginUser(loginCredentials);
      expect(result).toEqual({ success: false, error: 'User is not registered' });
    });
  
    /**
   * Test case for handling login attempts with incorrect credentials.
   * It expects the service to return an error for wrong password or non-registered user.
   */
    it('should return an error for incorrect password', async () => {
        const mockUser = { id: 1, email: 'user@example.com', password: 'hashedPassword' };
        dataLayer.getUserByEmail.mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValue(false); // Simulate incorrect password
      
        const loginCredentials = { email: 'user@example.com', password: 'wrongPassword' };
      
        const result = await userService.loginUser(loginCredentials);
        expect(result).toEqual({ success: false, error: "Wrong Username And Password Combination" });
      });
      it('should handle exceptions', async () => {
        dataLayer.getUserByEmail.mockRejectedValue(new Error('Database error'));
      
        const loginCredentials = { email: 'user@example.com', password: 'password123' };
      
        await expect(userService.loginUser(loginCredentials)).rejects.toThrow('Database error');
      });
      it('should return an error if the user is not found', async () => {
        dataLayer.getUserByEmail.mockResolvedValue(null); // No user found
      
        const loginCredentials = { email: 'nonexistent@example.com', password: 'password123' };
      
        const result = await userService.loginUser(loginCredentials);
        expect(result).toEqual({ success: false, error: "User is not registered" });
      });
      it('should handle errors in token generation', async () => {
        const mockUser = { id: 1, email: 'user@example.com', password: 'hashedPassword' };
        dataLayer.getUserByEmail.mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValue(true);
        sign.mockImplementation(() => {
          throw new Error('Token generation error');
        });
      
        const loginCredentials = { email: 'user@example.com', password: 'password123' };
      
        await expect(userService.loginUser(loginCredentials)).rejects.toThrow('Token generation error');
      });
      
      
      
  });