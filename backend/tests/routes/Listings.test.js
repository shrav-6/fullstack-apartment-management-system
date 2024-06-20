/**
 * Test suite for the listings-related routes 
 */
const request = require('supertest');
const express = require('express');
const listingsRouter = require('../../routes/Listings'); 
const jwtMock = require('../mocks/jwtMock');
const dbMock = require('../mocks/dbMock');

jest.mock('jsonwebtoken', () => require('../mocks/jwtMock'));
jest.mock('../../models', () => require('../mocks/dbMock'));

const app = express();
app.use(express.json());
app.use('/listings', listingsRouter);

describe('Listings route tests', () => {
    // Tests for POST / to create a new listing
    describe('POST /', () => {
      it('should create a listing for a valid manager', async () => {
        dbMock.managers.findOne.mockResolvedValue({ id: 1, userId: 1 });
        dbMock.buildings.findOne.mockResolvedValue({ id: 1, managerId: 1 });
        dbMock.listings.create.mockResolvedValue({ 
            id: 3, // New listing ID
  unitAvailable: '3BHK',
  rent: 1500,
  address: '789 Pine St',
  pets: 'Allowed',
  startsFrom: '2023-03-01',
  description: 'Lovely 3BHK in a serene neighborhood',
  extras: 'Private garden',
  buildingId: 1,
  managerId: 1
        });
        const listingDataToSend = {
            unitAvailable: '3BHK',
            rent: 1500,
            address: '789 Pine St',
            pets: 'Allowed',
            startsFrom: '2023-03-01',
            description: 'Lovely 3BHK in a serene neighborhood',
            extras: 'Private garden',
            buildingName: 'Building One' // Assuming this is required to find the correct building
          };
        const response = await request(app)
          .post('/listings')
          .set('accessToken', 'valid_token')
          .send( listingDataToSend );
  
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBeTruthy();
        
      });
      it('should create a listing for a valid manager and building', async () => {
        dbMock.managers.findOne.mockResolvedValue({ id: 1, userId: 1 });
        dbMock.buildings.findOne.mockResolvedValue({ id: 1, managerId: 1 });
        dbMock.listings.create.mockResolvedValue({
          id: 1,
          unitAvailable: 'Unit 101',
          rent: 1000,
          address: '123 Main St',
          pets: true,
          startsFrom: '2023-01-01',
          description: 'Nice apartment',
          extras: 'Parking space',
          buildingId: 1,
          managerId: 1,
        });
  
        const response = await request(app)
          .post('/listings')
          .set('accessToken', 'valid_token')
          .send({
            unitAvailable: 'Unit 101',
            rent: 1000,
            address: '123 Main St',
            pets: true,
            startsFrom: '2023-01-01',
            description: 'Nice apartment',
            extras: 'Parking space',
            buildingName: 'Test Building',
          });
  
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBeTruthy();
        
      });
  
      
    });
  
   // Tests for GET /:ListingId to get a specific listing
    describe('GET /:ListingId', () => {
      it('should return a specific listing for a valid manager', async () => {
        dbMock.managers.findOne.mockResolvedValue({ id: 1, userId: 1 });
        dbMock.listings.findOne.mockResolvedValue({  id: 1,
            unitAvailable: '2BHK',
            rent: 1200,
            address: '123 Main St',
            pets: 'Allowed',
            startsFrom: '2023-01-01',
            description: 'Spacious 2BHK with great view',
            extras: 'Gym and Pool',
            buildingId: 1,
            managerId: 1 });
  
        const response = await request(app)
          .get('/listings/1')
          .set('accessToken', 'valid_token');
  
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBeTruthy();
        
      });
  
      
    });
  
    // PUT /:ListingId to update a specific listing
    describe('PUT /:ListingId', () => {
      it('should update a specific listing for a valid manager', async () => {
        dbMock.managers.findOne.mockResolvedValue({ id: 1, userId: 1 });
        dbMock.listings.findOne.mockResolvedValue({ id: 1, managerId: 1 });
        dbMock.listings.update.mockResolvedValue([1]); // Mock update return
  
        const response = await request(app)
          .put('/listings/1')
          .set('accessToken', 'valid_token')
          .send({  unitAvailable: '3BHK',
          rent: 1600,
          address: '123 Updated St',
          pets: 'Allowed',
          startsFrom: '2023-06-01',
          description: 'Newly renovated 3BHK',
          extras: 'Pool, Gym, Parking' });
  
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBeTruthy();
    
      });
  
    });
  
    // DELETE /:ListingId to delete a specific listing
    describe('DELETE /:ListingId', () => {
      it('should delete a specific listing for a valid manager', async () => {
        dbMock.managers.findOne.mockResolvedValue({ id: 1, userId: 1 });
        dbMock.listings.findOne.mockResolvedValue({ id: 1, managerId: 1 });
        dbMock.listings.destroy.mockResolvedValue(1); // Mock delete return
  
        const response = await request(app)
          .delete('/listings/1')
          .set('accessToken', 'valid_token');
  
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBeTruthy();
        
      });
      it('should return an error for an invalid manager while deleting a listing', async () => {
        // Mock scenario where manager is not found
        dbMock.managers.findOne.mockResolvedValue(null);
    
        const response = await request(app)
          .delete('/listings/1')
          .set('accessToken', 'invalid_manager_token');
    
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBeFalsy();
      });
  
      
    });
  });
  
