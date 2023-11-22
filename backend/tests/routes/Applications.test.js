// const request = require('supertest');
// const express = require('express');
// const jwtMock = require('../mocks/jwtMock');
// const dbMock = require('../mocks/dbMock');
// const applicationsRouter = require('../../routes/Applications'); // Update the path

// jest.mock('jsonwebtoken', () => require('../mocks/jwtMock'));
// jest.mock('../../models', () => require('../mocks/dbMock'));

// const app = express();
// app.use(express.json());
// app.use('/applications', applicationsRouter);
// describe('POST /applications/create', () => {
//     beforeEach(() => {
//       jest.clearAllMocks();
//     });
  
//     it('should create a new application successfully', async () => {
//         const mockedApplicationCreateResponse = {
//             id: 100, // Example ID for the newly created application
//             firstName: 'John',
//             lastName: 'Doe',
//             moveInDate: '2023-01-01',
//             needParking: true,
//             email: 'johndoe@example.com',
//             phoneNumber: '1234567890',
//             address: '123 Main St',
//             additionalInfo: 'No pets',
//             listingId: 1,
//             userId: 'user_123', // The ID of the user who created the application
//             status: 'In progress', 
//             createdAt: new Date(),
//             updatedAt: new Date()
//           };
          
//       dbMock.listings.findOne.mockResolvedValue({ id: 1 }); // Mock listing data
//       dbMock.applications.create.mockResolvedValue({ mockedApplicationCreateResponse });
  
//       const applicationData = {
//         firstName: 'John',
//         lastName: 'Doe',
//         moveInDate: '2023-01-01',
//         needParking: true,
//         email: 'johndoe@example.com',
//         phoneNumber: '1234567890',
//         address: '123 Main St',
//         additionalInfo: 'No pets',
//         listingId: 1
//       };
  
//       const response = await request(app).post('/applications/create').send(applicationData).set('accessToken', 'valid_token');
//       expect(response.statusCode).toBe(200);
//       expect(response.body.success).toBeTruthy();
//       // Additional assertions...
//     });
  
//     it('should handle listing not found', async () => {
//       dbMock.listings.findOne.mockResolvedValue(null);
//       const response = await request(app).post('/applications/create').send({  firstName: 'John',
//       lastName: 'Doe',
//       moveInDate: '2023-01-01',
//       needParking: true,
//       email: 'johndoe@example.com',
//       phoneNumber: '1234567890',
//       address: '123 Main St',
//       additionalInfo: 'No pets',
//       listingId: 1 }).set('accessToken', 'valid_token');
//       expect(response.statusCode).toBe(200);
//       expect(response.body.success).toBeFalsy();
//       // Additional assertions...
//     });
  
//     // Additional test cases...
//   });
//   describe('PUT /applications/accept_reject/:applicationId', () => {
//     beforeEach(() => {
//       jest.clearAllMocks();
//     });
  
//     it('should update application status successfully', async () => {
//       dbMock.managers.findOne.mockResolvedValue({ userId: 'manager_1' });
//       dbMock.applications.findOne.mockResolvedValue({ id: 1, userId: 'manager_1' });
//       dbMock.applications.update.mockResolvedValue([1]); // Mock update return
  
//       const response = await request(app).put('/applications/accept_reject/1').send({ status: 'accept' }).set('accessToken', 'valid_token');
//       expect(response.statusCode).toBe(200);
//       expect(response.body.success).toBeTruthy();
//       // Additional assertions...
//     });
  
//     // Additional test cases for 'reject', invalid status, no manager found, etc.
//   });
  
//   describe('GET /applications/all/:listingId', () => {
//     beforeEach(() => {
//       jest.clearAllMocks();
//     });
  
//     it('should retrieve all applications for a listing', async () => {
//       dbMock.managers.findOne.mockResolvedValue({ userId: 'manager_1' });
//       dbMock.applications.findAll.mockResolvedValue([  {
//         id: 1,
//         firstName: 'Alice',
//         lastName: 'Smith',
//         moveInDate: '2023-02-01',
//         needParking: true,
//         email: 'alice@example.com',
//         phoneNumber: '1234567891',
//         address: '456 Oak St',
//         additionalInfo: 'No pets, non-smoker',
//         listingId: 1,
//         userId: 'user_123',
//         status: 'Pending',
//         createdAt: new Date('2023-01-01'),
//         updatedAt: new Date('2023-01-10')
//       },
//       {
//         id: 2,
//         firstName: 'Bob',
//         lastName: 'Johnson',
//         moveInDate: '2023-03-01',
//         needParking: false,
//         email: 'bob@example.com',
//         phoneNumber: '1234567892',
//         address: '789 Maple St',
//         additionalInfo: 'Has a cat',
//         listingId: 1,
//         userId: 'user_124',
//         status: 'Reviewed',
//         createdAt: new Date('2023-01-05'),
//         updatedAt: new Date('2023-01-15')
//       }]);
  
//       const response = await request(app).get('/applications/all/1').set('accessToken', 'valid_token');
//       expect(response.statusCode).toBe(200);
//       expect(response.body.success).toBeTruthy();
//       // Additional assertions...
//     });
  
//     // Additional test cases for no applications found, no manager found, etc.
//   });
//   describe('GET /applications/get/:applicationId', () => {
//     beforeEach(() => {
//       jest.clearAllMocks();
//     });
  
//     it('should retrieve a specific application', async () => {
//       dbMock.managers.findOne.mockResolvedValue({ userId: 'manager_1' });
//       dbMock.applications.findOne.mockResolvedValue({ firstName: 'John',
//       lastName: 'Doe',
//       moveInDate: '2023-01-01',
//       needParking: true,
//       email: 'johndoe@example.com',
//       phoneNumber: '1234567890',
//       address: '123 Main St',
//       additionalInfo: 'No pets',
//       listingId: 1});
  
//       const response = await request(app).get('/applications/get/1').set('accessToken', 'valid_token');
//       expect(response.statusCode).toBe(200);
//       expect(response.body.success).toBeTruthy();
//       // Additional assertions...
//     });
  
//     // Additional test cases for no application found, no manager found, etc.
//   });
//   describe('GET /applications/getAll', () => {
//     beforeEach(() => {
//       jest.clearAllMocks();
//     });
  
//     it('should retrieve all applications', async () => {
//       dbMock.managers.findOne.mockResolvedValue({ userId: 'manager_1' });
//       dbMock.applications.findAll.mockResolvedValue([  {
//         id: 1,
//         firstName: 'Alice',
//         lastName: 'Smith',
//         moveInDate: '2023-02-01',
//         needParking: true,
//         email: 'alice@example.com',
//         phoneNumber: '1234567891',
//         address: '456 Oak St',
//         additionalInfo: 'No pets, non-smoker',
//         listingId: 1,
//         userId: 'user_123',
//         status: 'Pending',
//         createdAt: new Date('2023-01-01'),
//         updatedAt: new Date('2023-01-10')
//       },
//       {
//         id: 2,
//         firstName: 'Bob',
//         lastName: 'Johnson',
//         moveInDate: '2023-03-01',
//         needParking: false,
//         email: 'bob@example.com',
//         phoneNumber: '1234567892',
//         address: '789 Maple St',
//         additionalInfo: 'Has a cat',
//         listingId: 1,
//         userId: 'user_124',
//         status: 'Reviewed',
//         createdAt: new Date('2023-01-05'),
//         updatedAt: new Date('2023-01-15')
//       }]);
  
//       const response = await request(app).get('/applications/getAll').set('accessToken', 'valid_token');
//       expect(response.statusCode).toBe(200);
//       expect(response.body.success).toBeTruthy();
//       // Additional assertions...
//     });
  
//     // Additional test cases for no applications found, no manager found, etc.
//   });
      
const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/', require('../../routes/Applications')); // Replace with the correct path to your router file

// Mocking the service layer
jest.mock('../../Service/Applications', () => ({
  createApplication: jest.fn().mockResolvedValue({ success: true }),
  acceptRejectApplication: jest.fn().mockResolvedValue({ success: true }),
  getAllApplicationsForListing: jest.fn().mockResolvedValue({ success: true }),
  getApplicationById: jest.fn().mockResolvedValue({ success: true }),
  getAllApplications: jest.fn().mockResolvedValue({ success: true }),
}));

// Mocking the validateToken middleware
jest.mock('../../Middleware/Middleware', () => ({
  validateToken: (req, res, next) => {
    // Mocked user token validation
    req.user = { id: 1 }; // Mock user object
    next();
  },
}));

describe('Applications Routes', () => {
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

    // Additional test cases...
  });

  describe('PUT /accept_reject/:applicationId', () => {
    it('should accept or reject an application', async () => {
      const response = await request(app)
        .put('/accept_reject/mockApplicationId')
        .send({ status: 'accepted' });

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBeTruthy();
    });

    // Additional test cases...
  });

  describe('GET /all/:listingId', () => {
    it('should get all applications for a listing', async () => {
      const response = await request(app)
        .get('/all/mockListingId');

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBeTruthy();
    });

    // Additional test cases...
  });

  describe('GET /get/:applicationId', () => {
    it('should get an application by ID', async () => {
      const response = await request(app)
        .get('/get/mockApplicationId');

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBeTruthy();
    });

    // Additional test cases...
  });

  describe('GET /getAll', () => {
    it('should get all applications', async () => {
      const response = await request(app)
        .get('/getAll');

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBeTruthy();
    });

    // Additional test cases...
  });
});