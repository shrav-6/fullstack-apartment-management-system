
const request = require('supertest');
const express = require('express');
const router = require('../../routes/users'); // Assuming the router is exported as userRoutes
const userService = require('../../Service/Users');

// Mocking the userService module
jest.mock('../../Service/Users');

const app = express();
app.use(express.json());
app.use('/auth', router); 

describe('User Routes', () => {
  describe('POST /signup', () => {
    it('should create a new user and return success', async () => {
      // Mocking the signUpUser function to return a successful result
      userService.signUpUser.mockResolvedValue({ success: true, data: 'User created successfully' });

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

    it('should handle errors during user signup', async () => {
      // Mocking the signUpUser function to throw an error
      userService.signUpUser.mockRejectedValue(new Error('Database error'));

      const userData = { 
      userName: 'TestUser',
      email: 'testuser@example.com',
      password: 'password123',
      role: 'user',
     };
      const response = await request(app).post('/auth/signup').send(userData);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({ success: false, data: 'An error occurred while processing your request.' });
    });
  });

  describe('POST /login', () => {
    it('should authenticate user and return success', async () => {
      // Mocking the loginUser function to return a successful result
      userService.loginUser.mockResolvedValue({ success: true, data: 'Login successful' });

      const loginData = {   
       email: 'test@example.com' ,
       password: 'password123',
    };
      const response = await request(app).post('/auth/login').send(loginData);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ success: true, data: 'Login successful' });
    });

    it('should handle errors during user login', async () => {
      // Mocking the loginUser function to throw an error
      userService.loginUser.mockRejectedValue(new Error('Authentication error'));

      const loginData = {  
         email: 'newuser@example.com',
      password: 'password123'
     };
      const response = await request(app).post('/auth/login').send(loginData);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({ success: false, data: 'An error occurred while processing your request.' });
    });
  });
});
