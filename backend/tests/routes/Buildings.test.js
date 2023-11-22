/**
 * Test suite for the buildings-related routes 
 */
const request = require('supertest');
const express = require('express');
const buildingsRouter = require('../../routes/Buildings');
const jwtMock = require('../mocks/jwtMock');
const dbMock = require('../mocks/dbMock');

// Mock the JWT and database
jest.mock('jsonwebtoken', () => require('../mocks/jwtMock'));
jest.mock('../../models', () => require('../mocks/dbMock'));


const app = express();
app.use(express.json());
app.use('/buildings', buildingsRouter);

describe('Buildings route tests', () => {
  /**
 * Test to verify the retrieval of building data for a valid manager using GET /:buildingId.
 * Ensures that the API returns the correct building data when accessed by a valid manager.
 */
  it('GET /:buildingId should return building data for valid manager', async () => {
    // Setup mock return value
    dbMock.managers.findOne.mockResolvedValue({ userId: 1 });
    dbMock.buildings.findOne.mockResolvedValue({ id: 1, managerId: 1 });

    const response = await request(app).get('/buildings/1').set('accessToken', 'valid_token');

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBeTruthy();
    
  });

  /**
 * Test to handle the scenario where an invalid building is queried by a manager using GET /:buildingId.
 * Verifies that the API correctly handles requests for non-existent buildings.
 */
  it('GET /:buildingId should handle invalid building for manager', async () => {
    // Setup mock return value for invalid building
    dbMock.managers.findOne.mockResolvedValue({ userId: 1 });
    dbMock.buildings.findOne.mockResolvedValue(null);

    const response = await request(app).get('/buildings/1').set('accessToken', 'valid_token');

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBeFalsy();
  });


/**
 * Tests for the GET / route.
 * Verifies if the API can retrieve all buildings managed by a valid manager.
 */
  describe('GET /', () => {
    it('should return all buildings for a valid manager', async () => {
      dbMock.managers.findOne.mockResolvedValue({ id: 1, userId: 1 });
      dbMock.buildings.findAll.mockResolvedValue([
        { 
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
        }
      
      ]);
  
      const response = await request(app).get('/buildings').set('accessToken', 'valid_token');
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBeTruthy();
     
    });
  });

/**
 * Tests for the POST / route.
 * Checks if the API allows a valid manager to create a new building.
 */
  describe('POST /', () => {
    it('should create a building for a valid manager', async () => {
      dbMock.managers.findOne.mockResolvedValue({ id: 1, userId: 1 });
      dbMock.buildings.findOne.mockResolvedValue(null); // No existing building
      dbMock.buildings.create.mockResolvedValue({ 
        id: 1, 
        buildingName: 'Building One', 
        address: '123 Main St', 
        phoneNumber: '1234567890', 
        managerId: 1 
      });
  
      const response = await request(app).post('/buildings').set('accessToken', 'valid_token').send({ buildingName: 'New Building', address: '123 Street', phoneNumber: '1234567890' });
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBeTruthy();
    
    });
  
    
  });
  
/**
 * Tests for the DELETE /:buildingId route.
 * Ensures that the API permits a valid manager to delete a building.
 */
  describe('DELETE /:buildingId', () => {
    it('should delete a building for a valid manager', async () => {
      dbMock.managers.findOne.mockResolvedValue({ id: 1, userId: 1 });
      dbMock.buildings.findOne.mockResolvedValue({ id: 1, managerId: 1 });
  
      const response = await request(app).delete('/buildings/1').set('accessToken', 'valid_token');
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBeTruthy();
     
    });
   /**
   * Tests for the PUT /:buildingId route.
   * Verifies if the API allows a valid manager to update building details.
   */
    describe('PUT /:buildingId', () => {
      it('should update a building for a valid manager', async () => {
        dbMock.managers.findOne.mockResolvedValue({ id: 1, userId: 1 });
        dbMock.buildings.findOne.mockResolvedValue({ id: 1, managerId: 1 });
        dbMock.buildings.update.mockResolvedValue([1]); // Number of updated rows
    
        const response = await request(app).put('/buildings/1').set('accessToken', 'valid_token').send({ buildingName: 'Updated Name', address: 'Updated Address', phoneNumber: '9876543210' });
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBeTruthy();
        
      });
      
    
     
    });
    


  });
  
  




});
