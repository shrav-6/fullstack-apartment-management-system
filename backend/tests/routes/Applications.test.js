/**
 * Test suite for application-related routes in the application's API.
 */
      
const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/', require('../../routes/Applications')); 

// Mocking the service layer
jest.mock('../../Service/Applications', () => ({
  createApplication: jest.fn().mockResolvedValue({ success: true }),
  acceptRejectApplication: jest.fn().mockResolvedValue({ success: true }),
  getAllApplicationsForListing: jest.fn().mockResolvedValue({ success: true }),
  getApplicationById: jest.fn().mockResolvedValue({ success: true }),
  getAllApplications: jest.fn().mockResolvedValue({ success: true }),
}));

// Mocking the validateToken middleware
jest.mock('../../Middleware/middleware', () => ({
  validateToken: (req, res, next) => {
    // Mocked user token validation
    req.user = { id: 1 }; // Mock user object
    next();
  },
}));

describe('Applications Routes', () => {
  
/**
 * Tests for the POST /create route.
 * Verifies if the API correctly creates a new application with the provided data.
 */
  describe('POST /create', () => {
    it('should create a new application', async () => {
      const response = await request(app)
        .post('/create')
        .send({  firstName: 'John',
                lastName: 'Doe',
                moveInDate: '2023-01-01',
                needParking: true,
                email: 'johndoe@example.com',
                phoneNumber: '1234567890',
                address: '123 Main St',
                additionalInfo: 'No pets',
                listingId: 1});

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBeTruthy();
    });

  
  }); 

  /* Tests for the PUT /accept_reject/:applicationId route.
  * Checks if the API can correctly accept or reject an application based on the provided application ID and status.
  */
  describe('PUT /accept_reject/:applicationId', () => {
    
    it('should accept or reject an application', async () => {
      const response = await request(app)
        .put('/updateStatus/mockApplicationId') 
        .send({ status: 'accepted' });

      expect(response.statusCode).toBe(200);
    });

    
  });


  /**
 * Tests for the GET /all/:listingId route.
 * Verifies if the API can retrieve all applications associated with a specific listing.
 */
  describe('GET /all/:listingId', () => {
    it('should get all applications for a listing', async () => {
      const response = await request(app)
        .get('/allApplicationsForListing/mockListingId') 

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBeTruthy();
    });

  });

  /**
 * Tests for the GET /get/:applicationId route.
 * Checks if the API can fetch a specific application using its application ID.
 */
  describe('GET /get/:applicationId', () => {
    it('should get an application by ID', async () => {
      const response = await request(app)
        .get('/get/mockApplicationId');

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBeTruthy();
    });

  });

  /**
 * Tests for the GET /getAll route.
 * Verifies if the API can retrieve all applications.
 */
  describe('GET /getAll', () => {
    it('should get all applications', async () => {
      const response = await request(app)
        .get('/getAll');

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBeTruthy();
    });

  });
});