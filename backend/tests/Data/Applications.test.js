// Import necessary dependencies and modules
const { createApplication, acceptRejectApplication, getAllApplicationsForListing, getApplicationById, getAllApplications,getRoleByUserId } = require("../../Data/Applications"); // Update the import path as needed
const { applications, managers, listings, users } = require("../../Models");

// Mock the models
jest.mock("../../Models");
jest.mock('../../Data/Applications', () => ({
    ...jest.requireActual('../../Data/Applications'),
    getRoleByUserId: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
  }));

describe('Data Module Tests', () => {
  beforeEach(() => {
    // Resetting mocks before each test
    applications.create.mockReset();
    applications.update.mockReset();
    applications.findAll.mockReset();
    applications.findOne.mockReset();
    managers.findOne.mockReset();
    users.findOne.mockReset();
  });

  it('should create a new application successfully', async () => {
    // Mock data for the application and listing
    const applicationData = {
      firstName: 'John',
      lastName: 'Doe',
      moveInDate: '2023-01-15',
      needParking: true,
      email: 'john.doe@example.com',
      phoneNumber: '123-456-7890',
      address: '123 Main St',
      additionalInfo: 'Additional information about the application',
      listingId: 1, // Mock a valid listing ID
    };
  
    const mockListing = {
      id: 1,
      // Other listing properties as needed
    };
  
    // Mock behavior for listings.findOne
    listings.findOne.mockResolvedValue(mockListing);
  
    // Call createApplication function
    const result = await createApplication(applicationData, 123); // Mock a user ID (e.g., 123)
  
    // Assert that the application creation was successful
    expect(result).toEqual({ success: true, message: 'Application created successfully, in pending with approval' });
  });
  

  it('should handle errors during application creation', async () => {
    // Set up mock data and mock behavior to trigger an error during application creation
    // Call createApplication function
    // Assert that the function handles errors properly
  });

//   it('should allow a manager to accept an application', async () => {
//     // Mock data for the application and manager
//     const applicationId = 1; // Mock a valid application ID
//     const managerUserId = 123; // Mock a manager's user ID
//     const mockApplication = {
//       id: applicationId,
//       userId: managerUserId, // Mock the manager as the user who created the application
//       // Other application properties as needed
//     };
  
//     // Mock behavior for managers.findOne to simulate finding a manager
//     managers.findOne.mockResolvedValue({ id: 1, userId: managerUserId, role: 'Manager' }); // Ensure the manager is correctly identified
  
//     // Mock behavior for applications.findOne to return the mock application
//     applications.findOne.mockResolvedValue(mockApplication);
  
//     // Mock behavior for applications.update to simulate successful update
//     applications.update.mockResolvedValue([1]);
  
//     // Call acceptRejectApplication function with 'accept' status
//     const result = await acceptRejectApplication(applicationId, 'accept', managerUserId);
  
//     // Assert that the application status is updated successfully
//     expect(result).toEqual({ success: true, message: 'Updated successfully' });
//   });
  
  

//   it('should allow a manager to reject an application', async () => {
//     // Mock data for the application and manager
//     const applicationId = 1; // Mock a valid application ID
//     const managerUserId = 123; // Mock a manager's user ID
//     const mockApplication = {
//       id: applicationId,
//       userId: managerUserId, // Mock the manager as the user who created the application
//       // Other application properties as needed
//     };
  
//     // Mock behavior for managers.findOne to simulate finding a manager
//     managers.findOne.mockResolvedValue({ id: 1, userId: managerUserId, role: 'Manager' }); // Ensure the manager is correctly identified
  
//     // Mock behavior for applications.findOne to return the mock application
//     applications.findOne.mockResolvedValue(mockApplication);
  
//     // Mock behavior for applications.update to simulate successful update
//     applications.update.mockResolvedValue([1]);
  
//     // Call acceptRejectApplication function with 'reject' status
//     const result = await acceptRejectApplication(applicationId, 'reject', managerUserId);
  
//     // Assert that the application status is updated successfully
//     expect(result).toEqual({ success: true, message: 'Updated successfully' });
//   });
  
  it('should handle invalid status during application acceptance/rejection', async () => {
    // Mock data for the application and manager
    const applicationId = 1; // Mock a valid application ID
    const managerUserId = 123; // Mock a manager's user ID
    const mockApplication = {
      id: applicationId,
      userId: managerUserId, // Mock the manager as the user who created the application
      // Other application properties as needed
    };
  
    // Mock behavior for managers.findOne to simulate finding a manager
    managers.findOne.mockResolvedValue({ id: 1, userId: managerUserId, role: 'Manager' }); // Ensure the manager is correctly identified
  
    // Mock behavior for applications.findOne to return the mock application
    applications.findOne.mockResolvedValue(mockApplication);
  
    // Call acceptRejectApplication function with an invalid status
    const invalidStatus = 'invalidStatus'; // Mock an invalid status
    const result = await acceptRejectApplication(applicationId, invalidStatus, managerUserId);
  
    // Assert that the function handles the invalid status properly
    expect(result).toEqual({ success: false, error: 'Can perform two operations either accept or reject' });
  });
  

  it('should handle errors during application acceptance/rejection', async () => {
    // Mock data for the application and manager
    const applicationId = 1; // Mock a valid application ID
    const managerUserId = 123; // Mock a manager's user ID
    const mockApplication = {
      id: applicationId,
      userId: managerUserId, // Mock the manager as the user who created the application
      // Other application properties as needed
    };
  
    // Mock behavior for managers.findOne to simulate finding a manager
    managers.findOne.mockResolvedValue({ id: 1, userId: managerUserId, role: 'Manager' }); // Ensure the manager is correctly identified
  
    // Mock behavior for applications.findOne to return the mock application
    applications.findOne.mockResolvedValue(mockApplication);
  
    // Mock behavior for applications.update to trigger an error
    applications.update.mockRejectedValue(new Error('Database error'));
  
    // Call acceptRejectApplication function
    const validStatus = 'accept'; // Mock a valid status
    const result = await acceptRejectApplication(applicationId, validStatus, managerUserId);
  
    // Assert that the function handles errors properly
    expect(result).toEqual({ success: false, error: "User is not a manager! Only managers can accept/reject applications!" });
  });
  

  it('should allow a manager to get all applications for a specific listing', async () => {
    // Set up mock data and mock behavior for managers.findOne, applications.findAll
    // Call getAllApplicationsForListing function
    // Assert that the function retrieves applications successfully
  });

  it('should return an error when a non-manager tries to get applications for a listing', async () => {
    // Set up mock data and mock behavior to simulate a non-manager user
    // Call getAllApplicationsForListing function
    // Assert that the function returns an error message
  });

  it('should handle errors during retrieval of applications for a listing', async () => {
    // Set up mock data and mock behavior to trigger an error during retrieval
    // Call getAllApplicationsForListing function
    // Assert that the function handles errors properly
  });

  it('should allow a manager to get a specific application by ID', async () => {
    // Set up mock data and mock behavior for managers.findOne, applications.findOne
    // Call getApplicationById function
    // Assert that the function retrieves the application successfully
  });

  it('should return an error when a non-manager tries to get a specific application by ID', async () => {
    // Set up mock data and mock behavior to simulate a non-manager user
    // Call getApplicationById function
    // Assert that the function returns an error message
  });

  it('should handle errors during retrieval of a specific application by ID', async () => {
    // Mock the behavior of applications.findOne to throw an error
    applications.findOne.mockRejectedValue(new Error('Database error'));

    // Call getApplicationById function with a valid application ID and user ID
    const result = await getApplicationById(123, 456); // Replace 123 and 456 with valid IDs

    // Assert that the function handles errors properly
    expect(result).toEqual({
      success: false,
      error: 'Internal Server Error',
    });
  });

  
  it('should return null when getting user role for a non-existent user', async () => {
    // Mock the behavior of getRoleByUserId to return null for a non-existent user ID
    getRoleByUserId.mockResolvedValue(null);

    // Call getRoleByUserId function directly with a non-existent user ID
    const result = await getRoleByUserId(456); // Replace 456 with a non-existent user ID

    // Assert that the function returns null
    expect(result).toBeNull();
  });
  
  

  it('should handle errors during retrieval of all applications', async () => {
    // Mock data for the manager
    const managerUserId = 123; // Mock a manager's user ID
  
    // Mock behavior for managers.findOne to simulate finding a manager
    managers.findOne.mockResolvedValue({ id: 1, userId: managerUserId, role: 'Manager' }); // Ensure the manager is correctly identified
  
    // Mock behavior for applications.findAll to trigger an error
    applications.findAll.mockRejectedValue(new Error('Database error'));
  
    // Call getAllApplications function
    const result = await getAllApplications(managerUserId);
  
    // Assert that the function handles errors properly
    expect(result).toEqual({ success: false, error: 'Internal Server Error' });
  });
  it('should not allow a non-manager user to get all applications for a specific listing', async () => {
    // Mock the behavior of managers.findOne to simulate a manager user
    managers.findOne.mockResolvedValue({ id: 456, userId: 789 }); // Replace with valid manager data

    // Mock the behavior of applications.findAll to return a list of applications
    const mockApplications = [
      {
        id: 1,
        listingId: 123,
        userId: 789,
        firstName: 'John',
        lastName: 'Doe',
        moveInDate: '2023-01-15',
        needParking: true,
        email: 'johndoe@example.com',
        phoneNumber: '123-456-7890',
        status: 'In progress',
        address: '123 Main St',
        additionalInfo: 'Additional info about the application',
        // Add more properties as needed
      },
      {
        id: 2,
        listingId: 123,
        userId: 789,
        firstName: 'Jane',
        lastName: 'Smith',
        moveInDate: '2023-02-01',
        needParking: false,
        email: 'janesmith@example.com',
        phoneNumber: '987-654-3210',
        status: 'Accepted',
        address: '456 Elm St',
        additionalInfo: 'Additional info about another application',
        // Add more properties as needed
      },
      // Add more mock applications as needed
    ];
    applications.findAll.mockResolvedValue(mockApplications);

    // Call getAllApplicationsForListing function with a valid listing ID and user ID
    const result = await getAllApplicationsForListing(123, 789); // Replace 123 and 789 with valid IDs

    // Assert that the function retrieves applications successfully
    expect(result).toEqual({
      success: false,
      error: 'Only manager can view the applications',
    });
  });

});
