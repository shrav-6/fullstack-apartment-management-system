/**
 * Test suite for the newsfeeds-related routes .
 */
const request = require('supertest');
const express = require('express');
const newsfeedsRouter = require('../../routes/Newsfeeds'); 
const jwtMock = require('../mocks/jwtMock');
const dbMock = require('../mocks/dbMock');
const { managers, tenants, newsfeeds } = require('../../models');

jest.mock('jsonwebtoken', () => require('../mocks/jwtMock'));
jest.mock('../../models', () => require('../mocks/dbMock'));

const app = express();
app.use(express.json());
app.use('/newsfeeds', newsfeedsRouter);

describe('Newsfeeds route tests', () => {
  /**
  * Tests for the GET /get/:newsfeedId endpoint.
  * This section includes tests to verify the behavior of fetching a specific newsfeed item.
  * It tests scenarios including unauthorized access, invalid newsfeed IDs, and successful data retrieval.
  */

  describe('GET /get/:newsfeedId', () => {

    it('should not return newsfeed data for unauthorized user', async () => {
      dbMock.managers.findOne.mockResolvedValue(null); // Assuming no manager found
      dbMock.tenants.findOne.mockResolvedValue(null); // Assuming no tenant found

      const response = await request(app).get('/newsfeeds/get/1').set('accessToken', 'invalid_token');
      expect(response.statusCode).toBe(200); // Or appropriate status code for unauthorized access
      expect(response.body.success).toBeFalsy();
      
      
    });

  
  });
  /**
   * Tests for the GET /tenant endpoint.
   * This section tests the retrieval of all newsfeeds relevant to a tenant.
   * It includes cases for valid tenant tokens, handling of non-existent tenants, and error responses.
   */
  describe('GET /tenant', () => {
    it('should return all newsfeeds for a valid tenant', async () => {
      dbMock.tenants.findOne.mockResolvedValue({ id: 1, userId: 1 });
      dbMock.newsfeeds.findAll.mockResolvedValue([
        {
          id: 1,
          title: 'News Update',
          description: 'Latest news for tenants',
          dateAndTime: '2023-07-05T09:00:00',
          tenantId: 1,
        },
       
      ]);

      const response = await request(app).get('/newsfeeds/tenant').set('accessToken', 'valid_tenant_token');
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBeTruthy();
     
    });

    it('should handle error when the tenant is not found', async () => {
      dbMock.tenants.findOne.mockResolvedValue(null);

      const response = await request(app).get('/newsfeeds/tenant').set('accessToken', 'valid_token');
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error).toBe("Tenant not found");
    });
  });

   /**
   * Tests for the GET / endpoint.
   * This series of tests checks the functionality of fetching all newsfeeds.
   * It covers scenarios like successful data fetching and error handling when a tenant is not found.
   */
  describe('GET /', () => {
    it('should return all newsfeeds for a valid tenant', async () => {
      dbMock.tenants.findOne.mockResolvedValue({ userId: 1, buildingId: 1 });
      dbMock.newsfeeds.findAll.mockResolvedValue([
        {
          id: 1,
          title: 'News Update',
          description: 'Latest news for tenants',
          dateAndTime: '2023-07-05T09:00:00',
          buildingId: 1,
        },
       
      ]);

      const response = await request(app).get('/newsfeeds').set('accessToken', 'valid_tenant_token');
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBeTruthy();
      
    });

    it('should handle error when the tenant is not found', async () => {
      dbMock.tenants.findOne.mockResolvedValue(null);

      const response = await request(app).get('/newsfeeds').set('accessToken', 'valid_token');
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error).toBe("Tenant not found");
    });
    it('should handle Internal server error ', async () => {
      dbMock.tenants.findOne.mockResolvedValue(null);

      const response = await request(app).get('/newsfeeds').set('accessToken', 'valid_tenant_token');
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error).toBe("Internal server error");
    });
  });

    /**
   * Tests for the GET /manager/:buildingId endpoint.
   * This part of the suite ensures that newsfeeds for a specific building managed by a manager are correctly retrieved.
   * It includes tests for authorization, permission checks, and successful data fetching.
   */
  describe('GET /manager/:buildingId', () => {
    it('should return all newsfeeds for a valid manager and building', async () => {
      dbMock.managers.findOne.mockResolvedValue({ id: 1, userId: 1 });
      dbMock.buildings.findOne.mockResolvedValue({ id: 1, managerId: 1 });
      dbMock.newsfeeds.findAll.mockResolvedValue([
        {
          id: 1,
          title: 'Manager Update',
          description: 'Latest updates from the manager',
          dateAndTime: '2023-07-05T09:00:00',
          buildingId: 1,
        },
       
      ]);

      const response = await request(app).get('/newsfeeds/manager/1').set('accessToken', 'valid_token');
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBeTruthy();
      
    });

    it('should handle error when the manager does not have permission', async () => {
      dbMock.managers.findOne.mockResolvedValue({ id: 2, userId: 2 }); // Different manager
      dbMock.buildings.findOne.mockResolvedValue({ id: 1, managerId: 1 }); // Building managed by a different manager

      const response = await request(app).get('/newsfeeds/manager/1').set('accessToken', 'valid_token');
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error).toBe("Cannot Access the Newsfeed,don't have permission");
    });
  });

/**
   * Tests for the POST / endpoint.
   * This section focuses on the creation of new newsfeeds.
   * It tests scenarios including successful creation for valid tenants and handling invalid tenant cases.
   */
  describe('POST /', () => {
    it('should create a newsfeed for a valid tenant', async () => {
      dbMock.tenants.findOne.mockResolvedValue({ id: 1, userId: 1 });
      dbMock.newsfeeds.create.mockResolvedValue({
        id: 3,
        title: 'New Newsfeed',
        description: 'Details of the new newsfeed',
        dateAndTime: '2023-01-10T12:00:00',
        type: 'Announcement',
        buildingId: 1,
        tenantId: 1,
      });

      const postData = {
        title: 'New Newsfeed',
        description: 'Details of the new newsfeed',
        dateAndTime: '2023-01-10T12:00:00',
        type: 'Announcement',
      };

      const response = await request(app).post('/newsfeeds').set('accessToken', 'valid_tenant_token').send(postData);
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBeTruthy();
     
    });

    it('should not create a newsfeed for an invalid tenant (tenant not found)', async () => {
      dbMock.tenants.findOne.mockResolvedValue(null);
      const postData = {
        title: 'New Newsfeed',
        description: 'Details of the new newsfeed',
        dateAndTime: '2023-01-10T12:00:00',
        type: 'Announcement',
      };
      const response = await request(app).post('/newsfeeds').set('accessToken', 'invalid_tenant_token').send(postData);
      expect(response.statusCode).toBe(200); 
      expect(response.body.success).toBeFalsy();
     
    });

   
  });
  /**
   * Tests for the DELETE /:newsfeedId endpoint.
   * These tests verify the deletion functionality of newsfeed items.
   * It includes test cases for successful deletion, handling invalid newsfeed IDs, and unauthorized access scenarios.
   */
  describe('DELETE /:newsfeedId', () => {
    it('should delete a newsfeed for a valid tenant', async () => {
      dbMock.tenants.findOne.mockResolvedValue({ id: 1, userId: 1 });
      dbMock.newsfeeds.findOne.mockResolvedValue({ id: 1, tenantId: 1 });

      const response = await request(app).delete('/newsfeeds/1').set('accessToken', 'valid_tenant_token');
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBeTruthy();
      
    });

    it('should not delete a newsfeed for an invalid newsfeed ID', async () => {
      dbMock.tenants.findOne.mockResolvedValue({ id: 1, userId: 1 });
      dbMock.newsfeeds.findOne.mockResolvedValue(null);
      const response = await request(app).delete('/newsfeeds/999').set('accessToken', 'valid_token');
      expect(response.statusCode).toBe(200); // Or appropriate status code for newsfeed not found
      expect(response.body.success).toBeFalsy();
      
    });

    it('should not delete a newsfeed for an invalid tenant', async () => {
      dbMock.tenants.findOne.mockResolvedValue(null);
      const response = await request(app).delete('/newsfeeds/1').set('accessToken', 'invalid_tenant_token');
      expect(response.statusCode).toBe(200); // Or appropriate status code for unauthorized access
      expect(response.body.success).toBeFalsy();
      
    });

    
  });

    /**
   * Tests for the PUT /:newsfeedId endpoint.
   * This section tests the update functionality for newsfeeds.
   * It includes scenarios for successful updates, handling of invalid tenants or newsfeed IDs, and authorization checks.
   */
  describe('PUT /:newsfeedId', () => {
it('should update a newsfeed for a valid tenant', async () => {
  dbMock.tenants.findOne.mockResolvedValue({ userId: 1, id: 1 }); // Mock a valid tenant
  dbMock.newsfeeds.findOne.mockResolvedValue({ id: 1, tenantId: 1 }); // Mock an existing newsfeed for the tenant
  dbMock.newsfeeds.update.mockResolvedValue([1]); // Mock the update response

  const updateData = {
    title: 'Updated Newsfeed',
    description: 'Updated details of the newsfeed',
    dateAndTime: '2023-01-15T15:00:00',
    type: 'UpdatedType',
  };

  const response = await request(app).put('/newsfeeds/1').set('accessToken', 'valid_tenant_token').send(updateData);
  expect(response.statusCode).toBe(200);
  expect(response.body.success).toBeTruthy();

});


    it('should not update a newsfeed for an invalid tenant', async () => {
      dbMock.tenants.findOne.mockResolvedValue(null);
      const updateData = {
        title: 'Updated Newsfeed',
        description: 'Updated details of the newsfeed',
        dateAndTime: '2023-01-15T15:00:00',
        type: 'Updated Announcement',
      };
      const response = await request(app).put('/newsfeeds/1').set('accessToken', 'invalid_tenant_token').send(updateData);
      expect(response.statusCode).toBe(200); // Or appropriate status code for unauthorized access
      expect(response.body.success).toBeFalsy();

    });

    it('should not update a newsfeed for an invalid newsfeed ID', async () => {
      dbMock.tenants.findOne.mockResolvedValue({ id: 1, userId: 1 });
      dbMock.newsfeeds.findOne.mockResolvedValue(null);
      const updateData = {
        title: 'Updated Newsfeed',
        description: 'Updated details of the newsfeed',
        dateAndTime: '2023-01-15T15:00:00',
        type: 'Updated Announcement',
      };
      const response = await request(app).put('/newsfeeds/999').set('accessToken', 'valid_token').send(updateData);
      expect(response.statusCode).toBe(200); // Or appropriate status code for newsfeed not found
      expect(response.body.success).toBeFalsy();
    });

    
  });
});
