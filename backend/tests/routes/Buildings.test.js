// /**
//  * Test suite for the buildings-related routes 
//  */

const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/', require('../../routes/Buildings'));

// Mocking the service layer
jest.mock('../../Service/Buildings', () => ({
  getAllBuildings: jest.fn().mockResolvedValue({ success: true, data: [{ 
    id: 1, 
    buildingName: 'Building One', 
    address: '123 Main St', 
    phoneNumber: '1234567890', 
    managerId: 1 
  },
  { 
    id: 2, 
    buildingName: 'Building Two', 
    address: '456 Elm St', 
    phoneNumber: '0987654321', 
    managerId: 1 
  }] }),
  getBuildingInfo: jest.fn().mockResolvedValue({ success: true, data: {  id: 1, 
    buildingName: 'Building One', 
    address: '123 Main St', 
    phoneNumber: '1234567890', 
    managerId: 1 } }),
  createBuilding: jest.fn().mockResolvedValue(true),
  deleteBuilding: jest.fn().mockResolvedValue(true),
  updateBuilding: jest.fn().mockResolvedValue(true),
  getAllBuildingsForSignUp: jest.fn().mockResolvedValue([]),
}));

// Mocking the validateToken middleware
jest.mock('../../middleware/Middleware', () => ({
  validateToken: (req, res, next) => {
    // Mocked user token validation
    req.user = { id: 1, role: 'Manager' }; // Mock user object
    next();
  },
}));

describe('Buildings Routes', () => {
  

    // Add more tests for different scenarios (e.g., unauthorized user, no buildings, etc.)
  });

  describe('GET /getBuildingInfo', () => {
    it('should get building info for a tenant', async () => {
      const response = await request(app)
        .get('/getBuildingInfo')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
    });
  });

  describe('POST /', () => {
    it('should create a new building', async () => {
      const response = await request(app)
        .post('/')
        .send({
          buildingName: 'New Building',
          address: '123 Main St', 
          phoneNumber: '1234567890', 
          managerId: 1 
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      // Add more assertions based on your application logic
    });

    
  describe('DELETE /:buildingId', () => {
    it('should delete a building', async () => {
      const response = await request(app)
        .delete('/buildingIdToDelete')
        .expect(200);

      expect(response.body.success).toBe(true);
      // Add more assertions based on your application logic
    });
  });

  describe('PUT /:buildingId', () => {
    it('should update a building', async () => {
      const response = await request(app)
        .put('/buildingIdToUpdate')
        .send({
          buildingName: 'Updated Building',
          // Add other fields to update
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      // Add more assertions based on your application logic
    });
  });

  describe('GET /signup/byName', () => {
    it('should get building names for signup', async () => {
      const response = await request(app)
        .get('/signup/byName')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.result).toBeDefined();
      // Add more assertions based on your application logic
    });
  });
  
  describe('DELETE /:buildingId', () => {
    it('should delete a building successfully', async () => {
      const response = await request(app)
        .delete('/buildingIdToDelete')
        .expect(200);

      expect(response.body.success).toBe(true);
      
    });

    it('should handle a nonexistent building during deletion', async () => {
      const response = await request(app)
        .delete('/nonexistentBuildingId')
        .expect(200);

      expect(response.body.success).toBe(true);
      
    });
  });

  describe('PUT /:buildingId', () => {
    it('should update a building successfully', async () => {
      const response = await request(app)
        .put('/buildingIdToUpdate')
        .send({
          buildingName: 'Updated Building',
          address: '456 Elm St', 
          phoneNumber: '0987654321', 
          managerId: 1 
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      // Add more assertions based on your application logic
    });
    it('should handle a nonexistent building during update', async () => {
      const response = await request(app)
        .put('/nonexistentBuildingId')
        .send({
          buildingName: 'Updated Building',
          address: '456 Elm St', 
         phoneNumber: '0987654321', 
          managerId: 1 
        })
        .expect(200);
    
      expect(response.body.success).toBe(true);
    });
    

  });

  describe('GET /signup/byName', () => {
    it('should get building names for signup successfully', async () => {
      const response = await request(app)
        .get('/signup/byName')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.result).toBeDefined();
      // Add more assertions based on your application logic
    });

    it('should handle no buildings available for signup', async () => {
      // Mock the service to return an empty array for no buildings
      jest.mock('../../service/Buildings', () => ({
        getAllBuildingsForSignUp: jest.fn().mockResolvedValue([]),
      }));
    
      const response = await request(app)
        .get('/signup/byName')
        .expect(200);
    
      expect(response.body.success).toBe(true);
    });
    
  });




  
  describe('DELETE /:buildingId', () => {
    it('should delete a building successfully', async () => {
      const response = await request(app)
        .delete('/buildingIdToDelete')
        .expect(200);

      expect(response.body.success).toBe(true);
      // Add more assertions based on your application logic
    });

    it('should handle a nonexistent building during deletion', async () => {
      const response = await request(app)
        .delete('/nonexistentBuildingId')
        .expect(200);

      expect(response.body.success).toBe(true);
      // Add more assertions based on your application logic
    });
  });

  describe('PUT /:buildingId', () => {
    it('should update a building successfully', async () => {
      const response = await request(app)
        .put('/buildingIdToUpdate')
        .send({
          buildingName: 'Updated Building',
          address: '456 Elm St',
          phoneNumber: '0987654321',
          managerId: 1,
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      // Add more assertions based on your application logic
    });

    it('should handle a nonexistent building during update', async () => {
      const response = await request(app)
        .put('/nonexistentBuildingId')
        .send({
          buildingName: 'Updated Building',
          address: '456 Elm St',
          phoneNumber: '0987654321',
          managerId: 1,
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      // Add more assertions based on your application logic
    });
  });

  describe('GET /signup/byName', () => {
    it('should get building names for signup successfully', async () => {
      const response = await request(app)
        .get('/signup/byName')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.result).toBeDefined();
      // Add more assertions based on your application logic
    });

    it('should handle no buildings available for signup', async () => {
      // Mock the service to return an empty array for no buildings
      jest.mock('../../service/Buildings', () => ({
        getAllBuildingsForSignUp: jest.fn().mockResolvedValue([]),
      }));

      const response = await request(app)
        .get('/signup/byName')
        .expect(200);

      expect(response.body.success).toBe(true);
      // Add more assertions based on your application logic
    });
  });

  });

  

  // ...


