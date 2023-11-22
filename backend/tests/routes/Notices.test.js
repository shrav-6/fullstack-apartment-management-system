/**
 * Test suite for notices routes.
 * It includes tests for each endpoint related to notices,
 * such as retrieving, creating, updating, and deleting notices.
 * Mocks are utilized for JWT authentication and database interactions.
 */
const request = require('supertest');
const express = require('express');
const noticesRouter = require('../../Routes/Notices');
const jwtMock = require('../mocks/jwtMock');
const dbMock = require('../mocks/dbMock');

jest.mock('jsonwebtoken', () => require('../mocks/jwtMock'));
jest.mock('../../models', () => require('../mocks/dbMock'));

const app = express();
app.use(express.json());
app.use('/notices', noticesRouter);

describe('Notices route tests', () => {
    /**
     * Tests for GET /:noticeId endpoint.
     * This section tests the retrieval of a specific notice by its ID.
     * It includes scenarios for authorized access (valid manager or tenant),
     * unauthorized access, and cases where the notice is not found.
     */
    describe('GET /:noticeId', () => {
      it('should return notice data for a valid manager', async () => {
        dbMock.managers.findOne.mockResolvedValue({ userId: 1 });
        dbMock.notices.findOne.mockResolvedValue({
          id: 1,
          title: 'Important Notice',
          description: 'Details about the notice',
          dateAndTime: '2023-01-01T12:00:00',
          managerId: 1
        });
  
        const response = await request(app).get('/notices/1').set('accessToken', 'valid_token');
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBeTruthy();
       
      });

      it('should not return notice data for unauthorized user', async () => {
        dbMock.managers.findOne.mockResolvedValue(null); // Assuming no manager found
        dbMock.tenants.findOne.mockResolvedValue(null); // Assuming no tenant found
  
        const response = await request(app).get('/notices/1').set('accessToken', 'invalid_token');
        expect(response.statusCode).toBe(200); // Or appropriate status code for unauthorized access
        expect(response.body.success).toBeFalsy();
      
      });

      it('should handle error when notice is not found for a valid tenant', async () => {
        dbMock.tenants.findOne.mockResolvedValue({ userId: 2, buildingId: 1 });
        dbMock.notices.findOne.mockResolvedValue(null);
  
        const response = await request(app).get('/notices/1').set('accessToken', 'valid_tenant_token');
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBeFalsy();
       
      });
    });
  
       /**
     * Tests for GET / endpoint.
     * This part of the test suite focuses on fetching all notices.
     * It tests the functionality for valid managers and unauthorized users,
     * ensuring correct access control and data retrieval.
     */
    describe('GET /', () => {
      it('should return all notices for a valid manager', async () => {
        dbMock.managers.findOne.mockResolvedValue({ id: 1, userId: 1 });
        dbMock.notices.findAll.mockResolvedValue([
           {id: 1,
            title: 'Maintenance Update',
            description: 'Scheduled maintenance on 5th July',
            dateAndTime: '2023-07-05T09:00:00',
            buildingId: 1,
            managerId: 1
          },
          {
            id: 2,
            title: 'Community Meeting',
            description: 'A community meeting on 10th July to discuss new amenities',
            dateAndTime: '2023-07-10T18:00:00',
            buildingId: 2,
            managerId: 1
          },
          {
            id: 3,
            title: 'Holiday Event',
            description: 'Join us for a holiday celebration on 25th December',
            dateAndTime: '2023-12-25T20:00:00',
            buildingId: 3,
            managerId: 1
          }
        ]);
  
        const response = await request(app).get('/Notices').set('accessToken', 'valid_token');
        expect(response.statusCode).toBe(200);
        
      });

     it('should handle error when the tenant is not found', async () => {
        dbMock.managers.findOne.mockResolvedValue(null);
        dbMock.tenants.findOne.mockResolvedValue(null);
  
        const response = await request(app).get('/notices').set('accessToken', 'valid_tenant_token');
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBeFalsy();
        expect(response.body.error).toBe("User doesn't have the permission");
      });
      
    });
    /**
     * Tests for POST / endpoint.
     * This section checks the creation of new notices.
     * It includes scenarios for successful creation by valid managers,
     * and failure cases for invalid managers or building details.
     */
    describe('POST /', () => {
      it('should create a notice for a valid manager', async () => {
        dbMock.managers.findOne.mockResolvedValue({ id: 1, userId: 1 });
        dbMock.buildings.findOne.mockResolvedValue({ id: 1, buildingName: 'Building One' });
        dbMock.notices.create.mockResolvedValue({
            id: 3,
            title: 'New Notice',
            description: 'Details of the new notice',
            dateAndTime: '2023-01-10T12:00:00',
            buildingId: 1,
            managerId: 1
          
        });
  
        const postData = {
          title: 'New Notice',
          description: 'Details of the new notice',
          dateAndTime: '2023-01-10T12:00:00',
          buildingName: 'Building One'
        };
  
        const response = await request(app).post('/notices').set('accessToken', 'valid_token').send(postData);
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBeTruthy();
      
      });

      it('should not create a notice for an invalid manager (manager not found)', async () => {
        dbMock.managers.findOne.mockResolvedValue(null);
        const postData = {
          title: 'New Notice',
          description: 'Details of the new notice',
          dateAndTime: '2023-01-10T12:00:00',
          buildingName: 'Building One'
        };
        const response = await request(app).post('/Notices').set('accessToken', 'invalid_manager_token').send(postData);
        expect(response.statusCode).toBe(200); 
        expect(response.body.success).toBeFalsy();
      
      });

      it('should not create a notice for an invalid manager (building not found)', async () => {
        dbMock.managers.findOne.mockResolvedValue({ id: 1, userId: 1 });
        dbMock.buildings.findOne.mockResolvedValue(null);
        const postData = {
          title: 'New Notice',
          description: 'Details of the new notice',
          dateAndTime: '2023-01-10T12:00:00',
          buildingName: 'Building One'
        };
        const response = await request(app).post('/notices').set('accessToken', 'valid_token').send(postData);
        expect(response.statusCode).toBe(200); // Or appropriate status code for building not found
        expect(response.body.success).toBeFalsy();
   
      });
  
    });
  
       /**
     * Tests for DELETE /:noticeId endpoint.
     * These tests ensure that deletion of notices works correctly,
     * covering cases like valid deletion requests, handling of invalid notice IDs,
     * and unauthorized access attempts.
     */
    describe('DELETE /:noticeId', () => {
      it('should delete a notice for a valid manager', async () => {
        dbMock.managers.findOne.mockResolvedValue({ id: 1, userId: 1 });
        dbMock.notices.findOne.mockResolvedValue({ id: 1, managerId: 1 });
  
        const response = await request(app).delete('/notices/1').set('accessToken', 'valid_token');
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBeTruthy();
      });

      it('should not delete a notice for an invalid notice ID', async () => {
        dbMock.managers.findOne.mockResolvedValue({ id: 1, userId: 1 });
        dbMock.notices.findOne.mockResolvedValue(null);
        const response = await request(app).delete('/notices/999').set('accessToken', 'valid_token');
        expect(response.statusCode).toBe(200); // Or appropriate status code for notice not found
        expect(response.body.success).toBeFalsy();
     
      });

      it('should not delete a notice for an invalid manager', async () => {
        dbMock.managers.findOne.mockResolvedValue(null);
        const response = await request(app).delete('/notices/1').set('accessToken', 'invalid_manager_token');
        expect(response.statusCode).toBe(200); // Or appropriate status code for unauthorized access
        expect(response.body.success).toBeFalsy();
      
      });
  
    });
  
      /**
     * Tests for PUT /:noticeId endpoint.
     * This section tests the updating of existing notices.
     * It includes test cases for successful updates by authorized managers,
     * handling of unauthorized requests, and error handling for non-existent notices.
     */
    describe('PUT /:noticeId', () => {
      it('should update a notice for a valid manager', async () => {
        dbMock.managers.findOne.mockResolvedValue({ id: 1, userId: 1 });
        dbMock.notices.findOne.mockResolvedValue({ id: 1, managerId: 1 });
        dbMock.notices.update.mockResolvedValue([1]);
  
        const updateData = {
          title: 'Updated Notice',
          description: 'Updated details of the notice',
          dateAndTime: '2023-01-15T15:00:00'
        };
  
        const response = await request(app).put('/notices/1').set('accessToken', 'valid_token').send(updateData);
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBeTruthy();

      });
      it('should not update a notice for an invalid manager', async () => {
        dbMock.managers.findOne.mockResolvedValue(null);
        const updateData = {
          title: 'Updated Notice',
          description: 'Updated details of the notice',
          dateAndTime: '2023-01-15T15:00:00'
        };
        const response = await request(app).put('/notices/1').set('accessToken', 'invalid_manager_token').send(updateData);
        expect(response.statusCode).toBe(200); // Or appropriate status code for unauthorized access
        expect(response.body.success).toBeFalsy();
       
      });

      it('should not update a notice for an invalid notice ID', async () => {
        dbMock.managers.findOne.mockResolvedValue({ id: 1, userId: 1 });
        dbMock.notices.findOne.mockResolvedValue(null);
        const updateData = {
          title: 'Updated Notice',
          description: 'Updated details of the notice',
          dateAndTime: '2023-01-15T15:00:00'
        };
        const response = await request(app).put('/notices/999').set('accessToken', 'valid_token').send(updateData);
        expect(response.statusCode).toBe(200); // Or appropriate status code for notice not found
        expect(response.body.success).toBeFalsy();
      
      });

      it('should handle errors when updating a notice for an unknown role', async () => {
        const updateData = {
          title: 'Updated Notice',
          description: 'Updated details of the notice',
          dateAndTime: '2023-01-15T15:00:00'
        };
  
        const response = await request(app).put('/notices/1').set('accessToken', 'unknown_role_token').send(updateData);
        expect(response.statusCode).toBe(200); // Or appropriate status code for internal server error
        expect(response.body.success).toBeFalsy();
        
      });
    
      
  
      
    });
  


  });
  