
/**
 * @fileoverview Unit tests for the building service functionality.
 * This file contains test suites for various building service functions such as 'getBuildingById', 'getAllBuildings', 'createBuilding', 'deleteBuilding', 'updateBuilding', and 'getAllBuildingsForSignUp'.
 * Each test suite includes multiple test cases to cover different scenarios and edge cases.
 * The tests verify the behavior of the building service functions in terms of retrieving, creating, updating, and deleting buildings.
 * The tests also handle error scenarios and check the response for invalid inputs and unauthorized roles.
 * The building service functions interact with the database models to perform the necessary operations.
 * Mocks are used to simulate the behavior of the database models and ensure isolated testing of the service functions.
 */

const buildingService = require("../../Data/Buildings");
const { buildings, managers } = require("../../Models");

jest.mock("../../Models");

/**
 * Test suite for 'getBuildingById' functionality.
 */
describe('getBuildingById', () => {
  /**
   * Test to ensure a manager can retrieve a building by its ID.
   * Verifies if the building information is correctly fetched for a valid manager.
   */
  it('should retrieve a building by ID for a manager', async () => {
    const buildingId = 1;
    const managerId = 123;
    managers.findOne.mockResolvedValue({ id: managerId, userId: 456 });
    buildings.findOne.mockResolvedValue({ id: buildingId, managerId: managerId });

    const result = await buildingService.getBuildingById(buildingId, 'Manager', 456);
    expect(result).toEqual({ id: buildingId, managerId: managerId });
  });
  
  /**
   * Test to check behavior when a manager is not found in the database.
   * Should return null if the manager does not exist.
   */
  it('should return null if the manager is not found', async () => {
    managers.findOne.mockResolvedValue(null);

    const result = await buildingService.getBuildingById(1, 'Manager', 456);
    expect(result).toBeNull();
  });
  
  /**
   * Test to verify behavior when a building is not found for the given manager.
   * Should return null if the building corresponding to the manager doesn't exist.
   */
  it('should return null if the building is not found for the manager', async () => {
    managers.findOne.mockResolvedValue({ id: 123, userId: 456 });
    buildings.findOne.mockResolvedValue(null);

    const result = await buildingService.getBuildingById(1, 'Manager', 456);
    expect(result).toBeNull();
  });
  
  /**
   * Test to check the system's response to an invalid role.
   * Should return null when a non-manager role is provided.
   */
  it('should return null for an invalid role', async () => {
    const result = await buildingService.getBuildingById(1, 'InvalidRole', 456);
    expect(result).toBeNull();
  });
  
   /**
   * Test to verify error handling during the building retrieval process.
   * Should throw an error in case of database or other internal issues.
   */
  it('should handle errors during retrieval', async () => {
    managers.findOne.mockRejectedValue(new Error('Database error'));

    await expect(buildingService.getBuildingById(1, 'Manager', 456)).rejects.toThrow('Database error');
  });
});

/**
 * Test suite for 'getAllBuildings' functionality.
 */
describe('getAllBuildings', () => {
  
  /**
   * Test to ensure that all buildings are retrieved correctly for a manager.
   * Verifies if the service returns all buildings associated with a valid manager ID.
   */
  it('should retrieve all buildings for a manager', async () => {
    const managerId = 123;
    managers.findOne.mockResolvedValue({ id: managerId, userId: 456 });
    buildings.findAll.mockResolvedValue([{ id: 1, buildingName: 'Building 1', managerId: managerId }]);

    const result = await buildingService.getAllBuildings('Manager', 456);
    expect(result).toEqual([{ id: 1, buildingName: 'Building 1', managerId: managerId }]);
  });

  /**
   * Test to check behavior when a manager is not found in the database.
   * Should return null if the manager does not exist.
   */
  it('should return null if the manager is not found', async () => {
    managers.findOne.mockResolvedValue(null);

    const result = await buildingService.getAllBuildings('Manager', 456);
    expect(result).toBeNull();
  });

  /**
   * Test to verify behavior when an invalid role is provided.
   * Should return null indicating no access for invalid or unauthorized roles.
   */
  it('should return null for an invalid role', async () => {
    const result = await buildingService.getAllBuildings('InvalidRole', 456);
    expect(result).toBeNull();
  });
  
  /**
   * Test to verify error handling during the building retrieval process.
   * Should throw an error in case of database or other internal issues.
   */
  it('should handle errors during retrieval', async () => {
    managers.findOne.mockRejectedValue(new Error('Database error'));

    await expect(buildingService.getAllBuildings('Manager', 456)).rejects.toThrow('Database error');
  });
});

/**
 * Test suite for the 'createBuilding' functionality in the building Data.
 */
describe('createBuilding', () => {

   /**
   * Test to check the behavior when the manager is not found in the database.
   * Verifies that the building creation process returns false when a manager is not present.
   */
  it('should return false if the manager is not found', async () => {
    managers.findOne.mockResolvedValue(null);

    const result = await buildingService.createBuilding({}, 456, 'Manager', 'New Building');
    expect(result).toBe(false);
  });
  
  /**
   * Test to ensure that a building with a duplicate name cannot be created.
   * Checks if the service correctly prevents creation of a building when one with the same name already exists.
   */
  it('should return false if the building with the same name already exists', async () => {
    const managerId = 123;
    managers.findOne.mockResolvedValue({ id: managerId, userId: 456 });
    buildings.findOne.mockResolvedValue({ id: 1, buildingName: 'Existing Building', managerId: managerId });

    const result = await buildingService.createBuilding({}, 456, 'Manager', 'Existing Building');
    expect(result).toBe(false);
  });
  
  /**
   * Test to verify the response when an invalid role is provided.
   * Ensures that building creation is not allowed for invalid or unauthorized roles.
   */
  it('should return false for an invalid role', async () => {
    const result = await buildingService.createBuilding({}, 456, 'InvalidRole', 'New Building');
    expect(result).toBe(false);
  });

  /**
   * Test to verify error handling during the building creation process.
   * Checks if the system properly throws an error in case of database or other internal issues.
   */
  it('should handle errors during creation', async () => {
    managers.findOne.mockRejectedValue(new Error('Database error'));

    await expect(buildingService.createBuilding({}, 456, 'Manager', 'New Building')).rejects.toThrow('Database error');
  });
});

/**
 * Test suite for the 'deleteBuilding' functionality in the building data.
 */
describe('deleteBuilding', () => {

   /**
   * Test to verify if a building can be successfully deleted by a manager.
   * Checks that the service allows a manager to delete a building they manage.
   */
  it('should delete a building for a manager', async () => {
    const managerId = 123;
    managers.findOne.mockResolvedValue({ id: managerId, userId: 456 });
    buildings.findOne.mockResolvedValue({ id: 1, buildingName: 'Building 1', managerId: managerId });

    const result = await buildingService.deleteBuilding(1, 456, 'Manager');
    expect(result).toBe(true);
  });
  
  /**
   * Test to ensure that the deletion process returns false if the manager is not found.
   * Validates that buildings cannot be deleted if the manager does not exist in the database.
   */
  it('should return false if the manager is not found', async () => {
    managers.findOne.mockResolvedValue(null);

    const result = await buildingService.deleteBuilding(1, 456, 'Manager');
    expect(result).toBe(false);
  });
  
   /**
   * Test to check the behavior when a building is not found for the given manager.
   * Verifies that the deletion process returns false if the specified building does not exist.
   */
  it('should return false if the building is not found for the manager', async () => {
    const managerId = 123;
    managers.findOne.mockResolvedValue({ id: managerId, userId: 456 });
    buildings.findOne.mockResolvedValue(null);

    const result = await buildingService.deleteBuilding(1, 456, 'Manager');
    expect(result).toBe(false);
  });
  
  /**
   * Test to confirm that deletion is not allowed for invalid or unauthorized roles.
   * Ensures the service returns false when an attempt to delete a building is made with an invalid role.
   */
  it('should return false for an invalid role', async () => {
    const result = await buildingService.deleteBuilding(1, 456, 'InvalidRole');
    expect(result).toBe(false);
  });

  /**
   * Test to verify error handling during the building deletion process.
   * Checks if the system properly throws an error in case of database or other internal issues.
   */
  it('should handle errors during deletion', async () => {
    managers.findOne.mockRejectedValue(new Error('Database error'));

    await expect(buildingService.deleteBuilding(1, 456, 'Manager')).rejects.toThrow('Database error');
  });
});
/**
 * 
 */

/**
 * Test suite for the 'updateBuilding' functionality in the building service.
 */
describe('updateBuilding', () => {

    /**
   * Test to verify if a building can be successfully updated by a manager.
   * Checks that the service allows a manager to update a building's details.
   */

  it('should update a building for a manager', async () => {
    const managerId = 123;
    managers.findOne.mockResolvedValue({ id: managerId, userId: 456 });
    buildings.findOne.mockResolvedValue({ id: 1, buildingName: 'Building 1', managerId: managerId });

    const result = await buildingService.updateBuilding(1, 'Updated Building', '456 Main St', '555-5678', 456, 'Manager');
    expect(result).toBe(true);
  });

  /**
   * Test to ensure that the update process returns false if the manager is not found.
   * Validates that buildings cannot be updated if the manager does not exist in the database.
   */
  it('should return false if the manager is not found', async () => {
    managers.findOne.mockResolvedValue(null);

    const result = await buildingService.updateBuilding(1, 'Updated Building', '456 Main St', '555-5678', 456, 'Manager');
    expect(result).toBe(false);
  });

   /**
   * Test to check the behavior when a building is not found for the given manager.
   * Verifies that the update process returns false if the specified building does not exist.
   */
  it('should return false if the building is not found for the manager', async () => {
    const managerId = 123;
    managers.findOne.mockResolvedValue({ id: managerId, userId: 456 });
    buildings.findOne.mockResolvedValue(null);

    const result = await buildingService.updateBuilding(1, 'Updated Building', '456 Main St', '555-5678', 456, 'Manager');
    expect(result).toBe(false);
  });
   
   /**
   * Test to confirm that update is not allowed for invalid or unauthorized roles.
   * Ensures the service returns false when an attempt to update a building is made with an invalid role.
   */
  it('should return false for an invalid role', async () => {
    /**
     * Represents the result of updating a building.
     * @type {Object}
     */
    const result = await buildingService.updateBuilding(1, 'Updated Building', '456 Main St', '555-5678', 456, 'InvalidRole');
    expect(result).toBe(false);
  });

  /**
   * Test to verify error handling during the building update process.
   * Checks if the system properly throws an error in case of database or other internal issues.
   */
  it('should handle errors during update', async () => {
    managers.findOne.mockRejectedValue(new Error('Database error'));

    await expect(buildingService.updateBuilding(1, 'Updated Building', '456 Main St', '555-5678', 456, 'Manager')).rejects.toThrow('Database error');
  });
});

/**
 * Test suite for the 'getAllBuildingsForSignUp' functionality in the building service.
 */

/**
   * Test to verify that building names are retrieved successfully for signup purposes.
   * Ensures that the service provides a list of building names for use in signup forms or similar functionalities.
   */
describe('getAllBuildingsForSignUp', () => {
  it('should retrieve building names for signup', async () => {
    buildings.findAll.mockResolvedValue([{ buildingName: 'Building 1' }, { buildingName: 'Building 2' }]);

    const result = await buildingService.getAllBuildingsForSignUp();
    expect(result).toEqual([{ buildingName: 'Building 1' }, { buildingName: 'Building 2' }]);
  });
  
  /**
   * Test to confirm that the system handles errors properly during the retrieval process for signup.
   * Checks if the service correctly throws an error in case of database or other internal issues.
   */
  it('should handle errors during retrieval for signup', async () => {
    buildings.findAll.mockRejectedValue(new Error('Database error'));

    await expect(buildingService.getAllBuildingsForSignUp()).rejects.toThrow('Database error');
  });
});
