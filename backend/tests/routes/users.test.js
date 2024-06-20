
const request = require('supertest');
const express = require('express');

const router = require('../../routes/users'); 
const userService = require('../../Service/Users');

// Mocking the userService module
jest.mock('../../Service/Users');

const app = express();
app.use(express.json());
app.use('/auth', router); 
/**
 * @description Test suite for user routes.
 */
describe('User Routes', () => {
   /**
   * @description Test case for the 'POST /signup' endpoint.
   */
  describe('POST /signup', () => {
     /**
     * @description It should create a new user and return success.
     */
    it('should create a new user and return success', async () => {
      // Mocking the signUpUser function to return a successful result
      userService.signUpUser.mockResolvedValue({ success: true, data: 'User created successfully' });
      /**
       * @type {Object} userData - Mock user data for the signup request.
       * @property {string} userName - User's username.
       * @property {string} email - User's email address.
       * @property {string} name - User's full name.
       * @property {string} password - User's password.
       * @property {string} role - User's role (e.g., 'Tenant').
       * @property {string} phoneNumber - User's phone number.
       * @property {string} address - User's address.
       * @property {string} buildingName - Name of the building where the user resides.
       * @property {string} apartmentNumber - User's apartment number.
       */
      const userData = {  
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
      const response = await request(app).post('/auth/signup').send(userData);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ success: true, data: 'User created successfully' });
    });
   /**
     * @description It should handle errors during user signup.
     */
    it('should handle errors during user signup', async () => {
      // Mocking the signUpUser function to throw an error
      userService.signUpUser.mockRejectedValue(new Error('Database error'));

        /**
       * @type {Object} userData - Mock user data for the signup request.
       * @property {string} userName - User's username.
       * @property {string} email - User's email address.
       * @property {string} password - User's password.
       * @property {string} role - User's role (e.g., 'user').
       */

      const userData = { 
      userName: 'TestUser',
      email: 'testuser@example.com',
      password: 'password123',
      role: 'user',
     };
      const response = await request(app).post('/auth/signup').send(userData);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ success: false, data: 'An error occurred while processing your request.' });
    });
  });
   /**
   * @description Test case for the 'POST /login' endpoint.
   */
  describe('POST /login', () => {
        /**
     * @description It should authenticate user and return success.
     */
    it('should authenticate user and return success', async () => {
      // Mocking the loginUser function to return a successful result
      userService.loginUser.mockResolvedValue({ success: true, data: 'Login successful' });
        /**
       * @type {Object} loginData - Mock login data for the login request.
       * @property {string} email - User's email address.
       * @property {string} password - User's password.
       */
      const loginData = {   
       email: 'test@example.com' ,
       password: 'password123',
    };
      const response = await request(app).post('/auth/login').send(loginData);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ success: true, data: 'Login successful' });
    });
     /**
     * @description It should handle errors during user login.
     */
    it('should handle errors during user login', async () => {
      // Mocking the loginUser function to throw an error
      userService.loginUser.mockRejectedValue(new Error('Authentication error'));
        /**
       * @type {Object} loginData - Mock login data for the login request.
       * @property {string} email - User's email address.
       * @property {string} password - User's password.
       */
      const loginData = {  
         email: 'newuser@example.com',
      password: 'password123'
     };
      const response = await request(app).post('/auth/login').send(loginData);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ success: false, data: 'An error occurred while processing your request.' });
    });
  });
});
