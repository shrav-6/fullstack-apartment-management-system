// Importing the necessary dependencies and modules
const listingsData = require('../../Data/Listings');
const { managers, buildings, listings } = require("../../Models");

// Mock the models
jest.mock("../../Models");

/**
 * Test suite for listings data functionalities.
 */
describe('ListingsData Tests', () => {
  /**
   * Resets mock implementations before each test for isolation and consistent test environment.
   */
  beforeEach(() => {
    // Resetting mocks before each test
    managers.findOne.mockReset();
    buildings.findOne.mockReset();
    listings.create.mockReset();
  });
  
   /**
   * Test to verify successful listing creation by a manager.
   * Ensures that a manager can create a new listing with valid data.
   */
  it('should create a listing successfully for a manager', async () => {
    // Setting up the mock return values for the models
    managers.findOne.mockResolvedValue({ id: 1, userId: 123 });
    buildings.findOne.mockResolvedValue({ id: 2, buildingName: 'Building 1', managerId: 1 });
    listings.create.mockResolvedValue({});

    // Creating a mock listing object with sample details
    const listing = {
      unitAvailable: 'Unit 101',
      rent: 1500,
      address: '123 Main St',
      pets: 'Allowed',
      startsFrom: '2023-01-01',
      description: 'Spacious apartment in a prime location',
      extras: 'Pool, Gym',
    };

    // Calling the createListing function with the mock data
    const result = await listingsData.createListing(listing, 123, 'Manager', 'Building 1');

    // Asserting that the listing creation was successful
    expect(result).toBe(true);
  });

  /**
   * Test to verify retrieval of all listings associated with a specific building.
   * Checks if the service returns the correct listings for a given building managed by a manager.
   */
  it('should retrieve listings for a specified building', async () => {
    // Mocking the managers.findOne function to simulate a manager being found
    managers.findOne.mockResolvedValue({ id: 1, userId: 123 });
  
    // Creating a mock array of listing objects with sample details
    const mockListings = [
      {
        id: 1,
        unitAvailable: 'Unit A',
        rent: 1200,
        address: '123 Main St',
        pets: 'Allowed',
        startsFrom: '2023-01-01',
        description: 'Cozy apartment in downtown',
        extras: 'Balcony, Gym access',
        buildingId: 2,
        managerId: 1
      },
      {
        id: 2,
        unitAvailable: 'Unit B',
        rent: 1400,
        address: '123 Main St',
        pets: 'Not Allowed',
        startsFrom: '2023-02-01',
        description: 'Spacious two-bedroom apartment',
        extras: 'Pool, Private parking',
        buildingId: 2,
        managerId: 1
      }
    ];
  
    // Mocking the listings.findAll function to return the mock array
    listings.findAll.mockResolvedValue(mockListings);
  
    // Calling the getAllListingsForBuilding function with the mock data
    const result = await listingsData.getAllListingsForBuilding(123, 2, 'Manager');
  
    // Asserting that the result is an array containing objects
    expect(result).toEqual(expect.arrayContaining([expect.any(Object)]));
  });
  
  /**
   * Test to check the behavior when no listings are found for a building.
   * Ensures that the service returns an empty array in such scenarios.
   */
  it('should return an empty array if no listings are found', async () => {
    managers.findOne.mockResolvedValue({ id: 1, userId: 123 });
    listings.findAll.mockResolvedValue([]);
  
    const result = await listingsData.getAllListingsForBuilding(123, 2, 'Manager');
    expect(result).toEqual([]); // Expecting an empty array
  });
  
  /**
 * Test to verify retrieval of all listings for public viewing.
 * Ensures that the service can provide a list of all available listings for non-managers or general public.
 */
  it('should retrieve all listings for public view', async () => {
    // Creating a mock array of listing objects with sample details
    const mockListings = [
      {
        id: 1,
        unitAvailable: 'Unit 301',
        rent: 2500,
        address: '456 Park Ave',
        pets: 'Allowed',
        startsFrom: '2023-03-01',
        description: 'Luxury apartment with city views',
        extras: 'Doorman, Fitness Center',
        building: { buildingName: 'Park Avenue Towers' }
      },
      {
        id: 2,
        unitAvailable: 'Unit 202',
        rent: 2200,
        address: '789 River Rd',
        pets: 'Not Allowed',
        startsFrom: '2023-04-01',
        description: 'Riverside apartment with modern amenities',
        extras: 'Rooftop Deck, 24/7 Security',
        building: { buildingName: 'Riverfront Residences' }
      }
    ];
  
    // Mocking the listings.findAll function to return the mock array
    listings.findAll.mockResolvedValue(mockListings);
  
    // Calling the getAllListingsForPublicView function with the mock data
    const result = await listingsData.getAllListingsForPublicView();
  
    // Asserting that the result is an array containing objects
    expect(result).toEqual(expect.arrayContaining([expect.any(Object)]));
  });
  
  /**
 * Test to check the behavior when no listings are found for public viewing.
 * Ensures that the service returns null in such scenarios, indicating no available listings.
 */
  it('should return null if no listings are found for public view', async () => {
    listings.findAll.mockResolvedValue([]);
  
    const result = await listingsData.getAllListingsForPublicView();
    expect(result).toBeNull();
  });

  /**
 * Test to verify retrieval of a specific listing by its ID for a manager.
 * Checks if a manager can fetch detailed information about a specific listing they manage.
 */
  it('should retrieve a specific listing by ID for a manager', async () => {
    // Mocking the managers.findOne function to simulate finding a manager
    managers.findOne.mockResolvedValue({ id: 1, userId: 123 });
  
    // Creating mock listing details to simulate a listing found by ID
    const mockListing = {
      id: 1,
      unitAvailable: 'Unit 505',
      rent: 1800,
      address: '100 Main Street',
      pets: 'Allowed',
      startsFrom: '2023-07-01',
      description: 'Modern apartment in a central location, close to amenities',
      extras: 'Pool, Gym, Underground Parking',
      managerId: 1,
      buildingId: 2
    };
  
    // Mocking the listings.findOne function to return the mock listing
    listings.findOne.mockResolvedValue(mockListing);
  
    // Calling the getListingById function and expecting to retrieve the specific listing
    const result = await listingsData.getListingById(1, 123, 'Manager');
  
    // Asserting that the result matches the mock listing object
    expect(result).toEqual(expect.any(Object));
    expect(result).toMatchObject(mockListing);
  });

  /**
 * Test to verify successful deletion of a listing by a manager.
 * Ensures that a manager can delete a listing they manage, confirming the deletion process works correctly.
 */
  it('should delete a listing successfully for a manager', async () => {
    // Mocking the managers.findOne function to simulate finding a manager
    managers.findOne.mockResolvedValue({ id: 1, userId: 123 });
  
    // Creating a mock listing object with sample details
    const mockListing = {
      id: 1,
      unitAvailable: 'Unit 305',
      rent: 2000,
      address: '123 Elm Street',
      pets: 'Allowed',
      startsFrom: '2023-05-01',
      description: 'Stylish apartment in a trendy neighborhood',
      extras: 'Rooftop terrace, Smart home features',
      managerId: 1,
      buildingId: 3
    };
  
    // Mocking the listings.findOne function to return the mock listing
    listings.findOne.mockResolvedValue(mockListing);
  
    // Mocking the listings.destroy method to simulate successful deletion
    listings.destroy.mockResolvedValue(1);
  
    // Calling the deleteListing function
    const result = await listingsData.deleteListing(1, 123, 'Manager');
  
    // Asserting that the deletion operation was successful
    expect(result).toBe(true);
  });
  
  /**
 * Test to verify successful update of a listing by a manager.
 * Checks if a manager can update the details of a listing they manage, ensuring the update process functions as expected.
 */

  it('should update a listing successfully for a manager', async () => {
    // Mocking the managers.findOne function to simulate finding a manager
    managers.findOne.mockResolvedValue({ id: 1, userId: 123 });
  
    // Creating a mock listing object with sample details for the existing listing
    const existingListing = {
      id: 1,
      unitAvailable: 'Unit 305',
      rent: 2000,
      address: '123 Elm Street',
      pets: 'Allowed',
      startsFrom: '2023-05-01',
      description: 'Stylish apartment in a trendy neighborhood',
      extras: 'Rooftop terrace, Smart home features',
      managerId: 1,
      buildingId: 3
    };
  
    // Mocking the listings.findOne function to return the existing listing
    listings.findOne.mockResolvedValue(existingListing);
  
    // Creating a mock object with the updated listing details
    const updatedData = {
      unitAvailable: 'Unit 305B',
      rent: 2100,
      address: '123 Elm Street, Apt B',
      pets: 'Not Allowed',
      startsFrom: '2023-06-01',
      description: 'Recently renovated apartment, now available',
      extras: 'New appliances, Fresh paint'
    };
  
    // Mocking the listings.update method to simulate successful update
    listings.update.mockResolvedValue([1]);
  
    // Calling the updateListing function with the updated data
    const result = await listingsData.updateListing(1, updatedData, 123, 'Manager');
  
    // Asserting that the update operation was successful
    expect(result).toBe(true);
  });
  
  /**
 * Test to verify that a non-manager cannot create a listing.
 * Ensures that the listing creation process is restricted to users with manager roles.
 */
  it('should return false if a non-manager tries to create a listing', async () => {
    const listing = {
      unitAvailable: 'Unit 403',
      rent: 1800,
      address: '789 Hill St',
      pets: 'Allowed',
      startsFrom: '2023-02-01',
      description: 'Quiet apartment near the park',
      extras: 'Garden, Balcony',
    };
  
    const result = await listingsData.createListing(listing, 456, 'Tenant', 'Building 2');
    expect(result).toBe(false);
  });
  
  /**
 * Test to check that a non-manager cannot update a listing.
 * Confirms that the listing update functionality is limited to users with manager roles.
 */
  it('should return false if a non-manager tries to update a listing', async () => {
    const updatedData = {  unitAvailable: 'Unit 403',
    rent: 1800,
    address: '789 Hill St',
    pets: 'Allowed',
    startsFrom: '2023-02-01',
    description: 'Quiet apartment near the park',
    extras: 'Garden, Balcony',};
    const result = await listingsData.updateListing(1, updatedData, 123, 'Tenant');
    expect(result).toBe(false);
  });
  
  /**
 * Test to handle errors during the listing creation process.
 * Verifies that the system correctly throws an exception in case of a database or other internal errors during listing creation.
 */
  it('should handle errors during listing creation', async () => {
    managers.findOne.mockResolvedValue({ id: 1, userId: 123 });
    buildings.findOne.mockResolvedValue({ id: 2, buildingName: 'Building 1', managerId: 1 });
    listings.create.mockRejectedValue(new Error('Database error'));
  
    const listing = {
      unitAvailable: 'Penthouse 5A',
      rent: 3500,
      address: '456 High St',
      pets: 'Not Allowed',
      startsFrom: '2023-08-01',
      description: 'Penthouse in the heart of the city',
      extras: 'Private elevator, Panoramic views',
    };
  
    await expect(listingsData.createListing(listing, 123, 'Manager', 'Building 1')).rejects.toThrow('Database error');
  });
  
  /**
 * Test to verify the behavior when no listings are found for public viewing.
 * Ensures that the system returns null, indicating the absence of listings for the general public.
 */
  it('should return null if no listings are found for public view', async () => {
    listings.findAll.mockResolvedValue([]);
    const result = await listingsData.getAllListingsForPublicView();
    expect(result).toBeNull();
  });
  
  /**
 * Test to ensure that a non-manager cannot update a listing.
 * Validates that listing update operations are restricted and cannot be performed by users without the manager role.
 */
  it('should return false if a non-manager tries to update a listing', async () => {
    // Creating mock updated listing details
    const updatedData = {
      unitAvailable: 'Unit 201',
      rent: 1600,
      address: '456 Maple Street',
      pets: 'Not Allowed',
      startsFrom: '2023-08-01',
      description: 'Renovated one-bedroom apartment with new appliances',
      extras: 'In-unit laundry, Central air conditioning'
    };
  
    // Attempting to update the listing as a non-manager role
    const result = await listingsData.updateListing(1, updatedData, 123, 'Tenant');
  
    // Asserting that the update operation should fail for a non-manager
    expect(result).toBe(false);
  });
  
  /**
 * Test to verify error handling during retrieval of listings for a specific building.
 * Ensures that the system throws an appropriate error in case of database or internal issues.
 */
  it('should handle errors during retrieval of listings for a building', async () => {
    managers.findOne.mockResolvedValue({ id: 1, userId: 123 });
    listings.findAll.mockRejectedValue(new Error('Database error'));
  
    await expect(listingsData.getAllListingsForBuilding(123, 2, 'Manager')).rejects.toThrow('Database error');
  });

  /**
 * Test to confirm error handling during the retrieval of a specific listing by ID.
 * Checks if the system correctly throws an error for internal issues during the retrieval process.
 */
  it('should handle errors during retrieval of a specific listing by ID', async () => {
    managers.findOne.mockResolvedValue({ id: 1, userId: 123 });
    listings.findOne.mockRejectedValue(new Error('Database error'));
  
    await expect(listingsData.getListingById(1, 123, 'Manager')).rejects.toThrow('Database error');
  });

  /**
 * Test to ensure error handling during the deletion of a listing.
 * Verifies that the system throws an error in case of database or internal issues during the deletion process.
 */
  it('should handle errors during listing deletion', async () => {
    managers.findOne.mockResolvedValue({ id: 1, userId: 123 });
    listings.findOne.mockResolvedValue({ id: 1, managerId: 1 });
    listings.destroy.mockRejectedValue(new Error('Database error'));
  
    await expect(listingsData.deleteListing(1, 123, 'Manager')).rejects.toThrow('Database error');
  });

  /**
 * Test to check if a non-manager can retrieve listings for a building.
 * Confirms that the service restricts this functionality and returns null for non-managers.
 */
  it('should return null if a non-manager tries to retrieve listings for a building', async () => {
    const result = await listingsData.getAllListingsForBuilding(123, 2, 'Tenant');
    expect(result).toBeNull();
  });

  
/**
 * Test to verify that a non-manager cannot delete a listing.
 * Ensures that the deletion process is restricted and returns false for non-manager roles.
 */
  it('should return false if a non-manager tries to delete a listing', async () => {
    listings.findOne.mockResolvedValue({ id: 1, managerId: 1 });
  
    const result = await listingsData.deleteListing(1, 123, 'Tenant');
    expect(result).toBe(false);
  });

  /**
 * Test to verify behavior when trying to retrieve listings for a non-existent building.
 * Checks if the service returns an empty array in such scenarios, indicating no available listings.
 */
  it('should return an empty array if trying to retrieve listings for a nonexistent building', async () => {
    managers.findOne.mockResolvedValue({ id: 1, userId: 123 });
    listings.findAll.mockResolvedValue([]);
  
    const result = await listingsData.getAllListingsForBuilding(123, 99, 'Manager');
    expect(result).toEqual([]);
  });

  /**
 * Test to ensure error handling during the retrieval of listings for public view.
 * Verifies that the system throws an appropriate error in case of database or internal issues.
 */
  it('should handle errors during retrieval of listings for public view', async () => {
    listings.findAll.mockRejectedValue(new Error('Database error'));
  
    await expect(listingsData.getAllListingsForPublicView()).rejects.toThrow('Database error');
  });
 
  /**
 * Test to check if updating a listing with incomplete data is successful.
 * Verifies that the service allows updates with partial data, returning true upon successful update.
 */
  it('should return true if updating a listing with incomplete data', async () => {
    managers.findOne.mockResolvedValue({ id: 1, userId: 123 });
    listings.findOne.mockResolvedValue({id: 1,
        unitAvailable: 'Unit 505',
        rent: 1800,
        address: '100 Main Street',
        pets: 'Allowed',
        startsFrom: '2023-07-01',
        description: 'Modern apartment in a central location, close to amenities',
        extras: 'Pool, Gym, Underground Parking',
        managerId: 1,
        buildingId: 2});
    listings.update.mockResolvedValue([1]); // Mock successful update even with incomplete data
  
    const updatedData = {
      rent: 2200 // Incomplete update data
    };
  
    const result = await listingsData.updateListing(1, updatedData, 123, 'Manager');
    expect(result).toBe(true);
  });
  
  /**
 * Test to confirm that a non-manager cannot retrieve a specific listing by ID.
 * Ensures that the service restricts this functionality and returns null for non-manager roles.
 */
  it('should return null if a non-manager tries to retrieve a specific listing by ID', async () => {
    const result = await listingsData.getListingById(1, 123, 'Tenant');
    expect(result).toBeNull();
  });
  
  
});
