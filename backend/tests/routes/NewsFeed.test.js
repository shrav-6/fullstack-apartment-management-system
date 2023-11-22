const request = require('supertest');
const express = require('express');
const newsfeedsRouter = require('../../routes/NewsFeed'); // Adjust the path accordingly
const jwtMock = require('../mocks/jwtMock');
const dbMock = require('../mocks/dbMock');
const { managers, tenants, newsfeeds } = require('../../Models');

jest.mock('jsonwebtoken', () => require('../mocks/jwtMock'));
jest.mock('../../models', () => require('../mocks/dbMock'));

const app = express();
app.use(express.json());
app.use('/newsfeeds', newsfeedsRouter);

describe('Newsfeeds route tests', () => {
  // GET /get/:newsfeedId
  describe('GET /get/:newsfeedId', () => {

    it('should not return newsfeed data for unauthorized user', async () => {
      dbMock.managers.findOne.mockResolvedValue(null); // Assuming no manager found
      dbMock.tenants.findOne.mockResolvedValue(null); // Assuming no tenant found

      const response = await request(app).get('/newsfeeds/get/1').set('accessToken', 'invalid_token');
      expect(response.statusCode).toBe(200); // Or appropriate status code for unauthorized access
      expect(response.body.success).toBeFalsy();
      
      
      // Additional assertions...
    });

    it('should handle error when newsfeed is not found for a valid tenant', async () => {
      dbMock.tenants.findOne.mockResolvedValue({ userId: 2, buildingId: 1 });
      dbMock.newsfeeds.findOne.mockResolvedValue(null);

      const response = await request(app).get('/newsfeeds/get/1').set('accessToken', 'valid_tenant_token');
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBeFalsy();
      // Additional assertions...
    });
  });

  // GET /tenant
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
        // Additional mock data...
      ]);

      const response = await request(app).get('/newsfeeds/tenant').set('accessToken', 'valid_tenant_token');
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBeTruthy();
      // Additional assertions...
    });

    it('should handle error when the tenant is not found', async () => {
      dbMock.tenants.findOne.mockResolvedValue(null);

      const response = await request(app).get('/newsfeeds/tenant').set('accessToken', 'valid_token');
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error).toBe("Tenant not found");
    });
  });

  // GET /
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
        // Additional mock data...
      ]);

      const response = await request(app).get('/newsfeeds').set('accessToken', 'valid_tenant_token');
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBeTruthy();
      // Additional assertions...
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

  // GET /manager/:buildingId
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
        // Additional mock data...
      ]);

      const response = await request(app).get('/newsfeeds/manager/1').set('accessToken', 'valid_token');
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBeTruthy();
      // Additional assertions...
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

  // POST /
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
      // Additional assertions...
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
      expect(response.statusCode).toBe(500); // Or appropriate status code for unauthorized access
      expect(response.body.success).toBeFalsy();
      // Additional assertions...
    });

    // ... More test cases for invalid scenarios
  });

  // DELETE /:newsfeedId
  describe('DELETE /:newsfeedId', () => {
    it('should delete a newsfeed for a valid tenant', async () => {
      dbMock.tenants.findOne.mockResolvedValue({ id: 1, userId: 1 });
      dbMock.newsfeeds.findOne.mockResolvedValue({ id: 1, tenantId: 1 });

      const response = await request(app).delete('/newsfeeds/1').set('accessToken', 'valid_tenant_token');
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBeTruthy();
      // Additional assertions...
    });

    it('should not delete a newsfeed for an invalid newsfeed ID', async () => {
      dbMock.tenants.findOne.mockResolvedValue({ id: 1, userId: 1 });
      dbMock.newsfeeds.findOne.mockResolvedValue(null);
      const response = await request(app).delete('/newsfeeds/999').set('accessToken', 'valid_token');
      expect(response.statusCode).toBe(200); // Or appropriate status code for newsfeed not found
      expect(response.body.success).toBeFalsy();
      // Additional assertions...
    });

    it('should not delete a newsfeed for an invalid tenant', async () => {
      dbMock.tenants.findOne.mockResolvedValue(null);
      const response = await request(app).delete('/newsfeeds/1').set('accessToken', 'invalid_tenant_token');
      expect(response.statusCode).toBe(200); // Or appropriate status code for unauthorized access
      expect(response.body.success).toBeFalsy();
      // Additional assertions...
    });

    
  });

  // PUT /:newsfeedId
  describe('PUT /:newsfeedId', () => {
    // Inside the test case
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
  // Additional assertions...
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
      expect(response.statusCode).toBe(500); // Or appropriate status code for unauthorized access
      expect(response.body.success).toBeFalsy();
      // Additional assertions...
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
      expect(response.statusCode).toBe(500); // Or appropriate status code for newsfeed not found
      expect(response.body.success).toBeFalsy();
      // Additional assertions...
    });

    
  });
});
