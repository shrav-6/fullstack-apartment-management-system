
const { createApplication, updateStatusApplication, getAllApplicationsForListing, getApplicationById, getAllApplications, getRoleByUserId } = require('../../Data/Applications');
const { listings, managers, applications, users } = require('../../models'); 



// Jest mock configuration
jest.mock('../../models');





// Run Jest
describe('Data Module Tests', () => {
  
  afterEach(() => {
    jest.resetAllMocks();
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
      name: 'Sample Apartment', // Replace with the actual name of the apartment
      description: 'A cozy place with a great view', // Replace with the actual description
      price: 1200, // Replace with the actual price
      bedrooms: 2, // Replace with the actual number of bedrooms
      bathrooms: 1, // Replace with the actual number of bathrooms
      location: '123 Main Street', // Replace with the actual location
      amenities: ['Air conditioning', 'Wi-Fi', 'Parking'], // Replace with the actual amenities
      // Add more properties as needed based on your application's requirements
    };
    

    // Mock behavior for listings.findOne
    listings.findOne.mockResolvedValue(mockListing);

    // Call createApplication function
    const result = await createApplication(applicationData, 'waitlisted', 123);

    // Assert that the application creation was successful
    expect(result).toEqual({ success: true, message: 'Application created successfully, in pending with approval' });
  });

  it('should handle invalid status during application acceptance/rejection', async () => {
    // Mock data for the application and manager
    const applicationId = 1; // Mock a valid application ID
    const managerUserId = 123; // Mock a manager's user ID
    const mockApplication = {
      id: applicationId,
      userId: managerUserId,
      firstName: 'John',
      lastName: 'Doe',
      moveInDate: '2023-01-15',
      needParking: true,
      email: 'john.doe@example.com',
      phoneNumber: '123-456-7890',
      status: 'Pending', // Replace with the actual initial status
      address: '123 Main St',
      additionalInfo: 'Additional information about the application',
      listingId: 1, 
    };

    // Mock behavior for managers.findOne to simulate finding a manager
    managers.findOne.mockResolvedValue({ id: 1, userId: managerUserId, role: 'Manager' });

    // Mock behavior for applications.findOne to return the mock application
    applications.findOne.mockResolvedValue(mockApplication);

    // Call updateStatusApplication function with an invalid status
    const invalidStatus = 'invalidStatus'; // Mock an invalid status
    const result = await updateStatusApplication(applicationId, invalidStatus, managerUserId);

    // Assert that the function handles the invalid status properly
    expect(result).toEqual({ success: false, error: 'User can only approve, reject, or waitlist' });
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
  it('should handle errors during retrieval of all applications', async () => {
    // Mock data for the manager
    const managerUserId = 123; // Mock a manager's user ID
    managers.findOne.mockResolvedValue({ id: 1, userId: managerUserId, role: 'Manager' });

    // Mock behavior for applications.findAll to trigger an error
    applications.findAll.mockRejectedValue(new Error('Database error'));

    // Call getAllApplications function
    const result = await getAllApplications(managerUserId);

    // Assert that the function handles errors properly
    expect(result).toEqual({ success: false, error: 'Internal Server Error' });
  });
  it('should return null when getting user role for a non-existent user', async () => {
    // Mock the behavior of getRoleByUserId to return null for a non-existent user ID
    users.findOne.mockResolvedValue(null);

    // Call getRoleByUserId function directly with a non-existent user ID
    const result = await getRoleByUserId(456); // Replace 456 with a non-existent user ID

    // Assert that the function returns null
    expect(result).toBeNull();
  });
  it('should handle errors during retrieval of a specific application by ID', async () => {
    // Mock the behavior of applications.findOne to throw an error
    applications.findOne.mockRejectedValue(new Error('Database error'));

    // Call getApplicationById function with a valid application ID and user ID
    const result = await getApplicationById(1, 123); // Replace 123 with a valid user ID

    // Assert that the function handles errors properly
    expect(result).toEqual({ success: false, error: 'Internal Server Error' });
  });

  it('should handle errors during application acceptance/rejection', async () => {
    // Mock data for the application and manager
    const applicationId = 1; // Mock a valid application ID
    const managerUserId = 123; // Mock a manager's user ID
    const mockApplication = {
      id: applicationId,
      userId: managerUserId,
      // Other application properties as needed
    };

    // Mock behavior for managers.findOne to simulate finding a manager
    managers.findOne.mockResolvedValue({ id: 1, userId: managerUserId, role: 'Manager' });

    // Mock behavior for applications.findOne to return the mock application
    applications.findOne.mockResolvedValue(mockApplication);

    // Mock behavior for applications.update to trigger an error
    applications.update.mockRejectedValue(new Error('Database error'));

    // Call updateStatusApplication function
    const validStatus = 'accept'; // Mock a valid status
    const result = await updateStatusApplication(applicationId, validStatus, managerUserId);

    // Assert that the function handles errors properly
    expect(result).toEqual({ success: false, error: "User can only approve, reject, or waitlist" });
  });
  it('should allow a manager to get all applications for a specific listing', async () => {
    // Mock data and behavior for a manager
    const managerUserId = 123; // Mock a manager's user ID
    managers.findOne.mockResolvedValue({ id: 1, userId: managerUserId, role: 'Manager' });

    // Mock data for applications
    const mockApplications = [
      { id: 1, listingId: 123, userId: 456,  },
      { id: 2, listingId: 123, userId: 789,  },
    ];
    applications.findAll.mockResolvedValue(mockApplications);

    // Call getAllApplicationsForListing function
    const result = await getAllApplicationsForListing(123, managerUserId);

    // Assert that the function retrieves applications successfully
    expect(result).toEqual({ success: true, message: 'Retrieved successfully', data: mockApplications });
  });

  it('should return an error when a non-manager tries to get applications for a listing', async () => {
    // Mock data for a non-manager user
    const nonManagerUserId = 456; // Mock a non-manager user ID
    managers.findOne.mockResolvedValue(null); // Simulate a non-manager user

    // Call getAllApplicationsForListing function
    const result = await getAllApplicationsForListing(123, nonManagerUserId);

    // Assert that the function returns an error message
    expect(result).toEqual({ success: false, error: 'Only manager can view the applications' });
  });

  it('should handle errors during retrieval of applications for a listing', async () => {
    // Mock data and behavior to trigger an error during retrieval
    const managerUserId = 123; // Mock a manager's user ID
    managers.findOne.mockResolvedValue({ id: 1, userId: managerUserId, role: 'Manager' });
    applications.findAll.mockRejectedValue(new Error('Database error'));

    // Call getAllApplicationsForListing function
    const result = await getAllApplicationsForListing(123, managerUserId);

    // Assert that the function handles errors properly
    expect(result).toEqual({ success: false, error: 'Internal Server Error' });
  });


  it('should handle errors during retrieval of a specific application by ID', async () => {
    // Mock the behavior of applications.findOne to throw an error
    applications.findOne.mockRejectedValue(new Error('Database error'));

    // Call getApplicationById function with a valid application ID and user ID
    const result = await getApplicationById(1, 123); // Replace 123 with a valid user ID

    // Assert that the function handles errors properly
    expect(result).toEqual({ success: false, error: 'Internal Server Error' });
  });

  it('should reject an application if the listing is not found during creation', async () => {
    // Mock data for the application
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

    // Mock behavior for listings.findOne to simulate the listing not being found
    listings.findOne.mockResolvedValue(null);

    // Call createApplication function
    const result = await createApplication(applicationData, 'waitlisted', 123);

    // Assert that the application creation fails with an error message
    expect(result).toEqual({ success: false, error: "You can't apply for this Apartment" });
  });


  it('should handle errors during retrieval of all applications for a specific listing', async () => {
    // Mock data and behavior for a manager
    const managerUserId = 123; // Mock a manager's user ID
    managers.findOne.mockResolvedValue({ id: 1, userId: managerUserId, role: 'Manager' });

    // Mock behavior for applications.findAll to trigger an error
    applications.findAll.mockRejectedValue(new Error('Database error'));

    // Call getAllApplicationsForListing function
    const result = await getAllApplicationsForListing(123, managerUserId);

    // Assert that the function handles errors properly
    expect(result).toEqual({ success: false, error: 'Internal Server Error' });
  });
});

