const request = require('supertest');
const express = require('express');
const jwtMock = require('../mocks/jwtMock');
const dbMock = require('../mocks/dbMock');
const wishlistRouter = require('../../routes/WishList'); 

jest.mock('jsonwebtoken', () => require('../mocks/jwtMock'));
jest.mock('../../models', () => require('../mocks/dbMock'));

const app = express();
app.use(express.json());
app.use('/wishlist', wishlistRouter);
/**
 * @description Test suite for WishList routes.
 @description Test case for the 'GET /wishlist/get' endpoint.
   */
describe('GET /wishlist/get', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    /**
     * @description It should retrieve user wishlists successfully.
     */
    it('should retrieve user wishlists successfully', async () => {
      // Mocking user and wishlist data
      dbMock.wishlists.findAll.mockResolvedValue([ {
        userId: 'user_1',
        listingId: 1,
        listing: {
          id: 1,
          unitAvailable: '3BHK',
          rent: 1500,
          address: '123 Main St',
          pets: 'Allowed',
          startsFrom: '2023-01-01',
          description: 'Spacious 3BHK in downtown',
          extras: 'Swimming pool and garden',
          building: {
            buildingName: 'Downtown Residency'
          }
        }
      },
      {
        userId: 'user_1',
        listingId: 2,
        listing: {
          id: 2,
          unitAvailable: 'Studio',
          rent: 1000,
          address: '456 Elm St',
          pets: 'Not Allowed',
          startsFrom: '2023-02-01',
          description: 'Cozy studio apartment with a great view',
          extras: 'Gym and rooftop access',
          building: {
            buildingName: 'Elm Street Complex'
          }
        }
      }]);
      dbMock.listings.findAll.mockResolvedValue([ {
        id: 1,
        unitAvailable: '3BHK',
        rent: 1500,
        address: '123 Main St',
        pets: 'Allowed',
        startsFrom: '2023-01-01',
        description: 'Spacious 3BHK in downtown',
        extras: 'Swimming pool and garden',
        building: {
          buildingName: 'Downtown Residency'
        }
      },
      {
        id: 2,
        unitAvailable: 'Studio',
        rent: 1000,
        address: '456 Elm St',
        pets: 'Not Allowed',
        startsFrom: '2023-02-01',
        description: 'Cozy studio apartment with a great view',
        extras: 'Gym and rooftop access',
        building: {
          buildingName: 'Elm Street Complex'
        }
      }]);
  
      const response = await request(app).get('/wishlist/get').set('accessToken', 'valid_token');
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBeTruthy();
     
    });
  
    
  
    
  });
  /**
   * @description Test case for the 'POST /wishlist/add' endpoint.
   */
  describe('POST /wishlist/add', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
   /**
     * @description It should add a listing to the wishlist.
     */
    it('should add a listing to the wishlist', async () => {
      dbMock.listings.findOne.mockResolvedValue( {id: 10,
        unitAvailable: '2BHK',
        rent: 1200,
        address: '789 Pine St',
        pets: 'Allowed',
        startsFrom: '2023-05-01',
        description: 'Comfortable 2BHK in a central location',
        extras: 'Parking, Gym',
        building: {
          buildingName: 'Pine Street Towers'
        }}
        );
      dbMock.wishlists.create.mockResolvedValue({id: 5,
        userId: 'user_123', // Assuming this is the ID of the user who created the wishlist item
        listingId: 10,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()});
  
      const response = await request(app).post('/wishlist/add').set('accessToken', 'valid_token').send({ listingId: 'mockListingId', status: true });
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBeTruthy();
     
    });
    /**
     * @description It should handle listing not found.
     */
    it('should handle listing not found', async () => {
      dbMock.listings.findOne.mockResolvedValue(null);
      const response = await request(app).post('/wishlist/add').set('accessToken', 'valid_token').send({ listingId: 'invalidListingId', status: true });
      expect(response.statusCode).toBe(404);
      
    });
  
    
  });
  /**
   * @description Test case for the 'POST /wishlist/remove' endpoint.
   */
    describe('POST /wishlist/remove', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
      /**
     * @description It should remove a listing from the wishlist.
     */
    it('should remove a listing from the wishlist', async () => {
      dbMock.wishlists.findOne.mockResolvedValue({
        id: 3,
        userId: 'user_123', // This should match the user ID of the authenticated user in the test
        listingId: 10, // This should match the listing ID being removed in the test
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        listing: {
          id: 10,
          unitAvailable: '1BHK',
          rent: 900,
          address: '456 Maple St',
          pets: 'Allowed',
          startsFrom: '2023-06-01',
          description: 'Cozy 1BHK perfect for singles',
          extras: 'Balcony, central heating',
          building: {
            buildingName: 'Maple Residences'
          }
        }});
      dbMock.wishlists.destroy.mockResolvedValue(1); // Return value for a successful deletion
  
      const response = await request(app).post('/wishlist/remove').set('accessToken', 'valid_token').send({ listingId: 'mockListingId' });
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBeTruthy();
   
    });

     /**
     * @description It should handle wishlist item not found.
     */
  
    it('should handle wishlist item not found', async () => {
      dbMock.wishlists.findOne.mockResolvedValue(null);
      const response = await request(app).post('/wishlist/remove').set('accessToken', 'valid_token').send({ listingId: 'invalidListingId' });
      expect(response.statusCode).toBe(404);
     
    });
  
    
  });
      