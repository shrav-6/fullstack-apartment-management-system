

const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/', require('../../routes/Applications')); // Assuming your routes are in a file named Applications.js

// Mocking the data layer
jest.mock('../../data/Applications', () => ({
  createApplication: jest.fn().mockResolvedValue({ success: true, message: 'Application created successfully' }),
  updateStatusApplication: jest.fn().mockResolvedValue({ success: true, message: 'Application status updated successfully' }),
  getAllApplicationsForListing: jest.fn().mockResolvedValue({ success: true, data: [] }),
  getApplicationById: jest.fn().mockResolvedValue({ success: true, data: {} }),
  getAllApplications: jest.fn().mockResolvedValue({ success: true, data: [] }),
}));

// Mocking the validateToken middleware
jest.mock('../../middleware/Middleware', () => ({
  validateToken: (req, res, next) => {
    // Mocked user token validation
    req.user = { id: 1, role: 'Manager' }; // Mock user object
    next();
  },
}));

describe('Applications Service', () => {
  describe('createApplication', () => {
    it('should create a new application', async () => {
      const response = await request(app)
        .post('/create')
        .send({
          // Add application details
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Application created successfully');
    });
  });

  describe('updateStatusApplication', () => {
    it('should update the status of an application', async () => {
      const response = await request(app)
        .put('/updateStatus/applicationIdToUpdate')
        .send({
          status: 'accepted',
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Application status updated successfully');
    });
  });

  describe('getAllApplicationsForListing', () => {
    it('should get all applications for a listing', async () => {
      const response = await request(app)
        .get('/allApplicationsForListing/listingId')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
    });
  });

  describe('getApplicationById', () => {
    it('should get a specific application by ID', async () => {
      const response = await request(app)
        .get('/get/applicationId')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
    });
  });

  describe('getAllApplications', () => {
    it('should get all applications', async () => {
      const response = await request(app)
        .get('/getAll')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
    });
  });
});

