

const buildingsService = require('../../Service/Buildings');
const dataLayer = require("../../Data/Buildings");

jest.mock("../../Data/Buildings");
/**
 * Test suite for 'getBuildingById' function in the buildings service.
 * It tests the retrieval of a building by its ID.
 */
describe('getBuildingById', () => {
  /**
   * Test case for successfully retrieving a building with a valid ID.
   * It checks if the service correctly returns the building data.
   */
  it('should return a building for a valid ID', async () => {
    const mockBuilding = { id: 1, name: 'Building 1' };
    dataLayer.getBuildingById.mockResolvedValue(mockBuilding);

    const result = await buildingsService.getBuildingById(1, 'admin', 123);
    expect(result).toEqual(mockBuilding);
  });
  /**
   * Test case for handling errors when an invalid ID is provided.
   * It expects the service to throw an error for non-existent building IDs.
   */
  it('should throw an error for an invalid ID', async () => {
    dataLayer.getBuildingById.mockRejectedValue(new Error('Building not found'));

    await expect(buildingsService.getBuildingById(999, 'admin', 123)).rejects.toThrow('Building not found');
  });
});
/**
 * Test suite for 'getAllBuildings' function in the buildings service.
 * It tests the functionality of retrieving all buildings.
 */
describe('getAllBuildings', () => {
   /**
   * Test case for retrieving all buildings with a valid user role.
   * It verifies if the service correctly returns a list of all buildings.
   */
  it('should return all buildings for a valid user role', async () => {
    const mockBuildings = [{ id: 1, name: 'Building 1' }, { id: 2, name: 'Building 2' }];
    dataLayer.getAllBuildings.mockResolvedValue(mockBuildings);

    const result = await buildingsService.getAllBuildings('admin', 123);
    expect(result).toEqual(mockBuildings);
  });
   /**
   * Test case for handling errors when an invalid user role is provided.
   * It expects the service to throw an error for unauthorized access.
   */
  it('should throw an error for an invalid role', async () => {
    dataLayer.getAllBuildings.mockRejectedValue(new Error('Unauthorized role'));

    await expect(buildingsService.getAllBuildings('guest', 123)).rejects.toThrow('Unauthorized role');
  });
});

/**
 * Test suite for 'createBuilding' function in the buildings service.
 * It tests the creation of a new building.
 */
describe('createBuilding', () => {
  /**
   * Test case for successfully creating a new building.
   * It checks if the service correctly creates a building with provided data.
   */
  it('should create a new building', async () => {
    const mockBuildingData = { name: 'New Building', address: '123 Street' };
    dataLayer.createBuilding.mockResolvedValue({ id: 3, ...mockBuildingData });

    const result = await buildingsService.createBuilding(mockBuildingData, 123, 'admin', 'New Building');
    expect(result).toMatchObject(mockBuildingData);
  });

  /**
   * Test case for handling errors with incomplete building data.
   * It expects the service to throw an error when provided data is incomplete.
   */

  it('should throw an error with incomplete data', async () => {
    dataLayer.createBuilding.mockRejectedValue(new Error('Incomplete data'));

    await expect(buildingsService.createBuilding({}, 123, 'admin', '')).rejects.toThrow('Incomplete data');
  });
});
/**
 * Test suite for 'deleteBuilding' function in the buildings service.
 * It tests the deletion of a building.
 */
describe('deleteBuilding', () => {
   /**
   * Test case for successfully deleting a building.
   * It verifies if the service correctly deletes a building with a given ID.
   */
  it('should delete a building', async () => {
    dataLayer.deleteBuilding.mockResolvedValue({ message: 'Building deleted successfully' });

    const result = await buildingsService.deleteBuilding(1, 123, 'admin');
    expect(result).toEqual({ message: 'Building deleted successfully' });
  });
   /**
   * Test case for handling errors when trying to delete a non-existent building.
   * It expects the service to throw an error for non-existent building IDs.
   */
  it('should throw an error for a non-existent building', async () => {
    dataLayer.deleteBuilding.mockRejectedValue(new Error('Building not found'));

    await expect(buildingsService.deleteBuilding(999, 123, 'admin')).rejects.toThrow('Building not found');
  });
});
/**
 * Test suite for 'updateBuilding' function in the buildings service.
 * It tests the updating of building information.
 */
describe('updateBuilding', () => {
    /**
   * Test case for successfully updating a building's information.
   * It checks if the service correctly updates the building with new details.
   */
  it('should update a building', async () => {
    const updatedInfo = { name: 'Updated Building', address: '456 Avenue', phoneNumber: '1234567890' };

    // Mock the expected resolved value
    dataLayer.updateBuilding.mockResolvedValue({ id: 1, ...updatedInfo });

    // Pass each property of updatedInfo as a separate argument
    const result = await buildingsService.updateBuilding(1, updatedInfo.name, updatedInfo.address, updatedInfo.phoneNumber, 123, 'admin');

    // Check if the result matches the updated information
    expect(result).toMatchObject(updatedInfo);
  });
 /**
   * Test case for handling errors with incomplete update information.
   * It expects the service to throw an error when update information is incomplete.
   */
  it('should throw an error with incomplete update information', async () => {
    dataLayer.updateBuilding.mockRejectedValue(new Error('Incomplete update information'));

    await expect(buildingsService.updateBuilding(1, '', '', '', 123, 'admin')).rejects.toThrow('Incomplete update information');
  });
});

/**
 * Test suite for 'getAllBuildingsForSignUp' function in the buildings service.
 * It tests retrieving all buildings for the purpose of user sign-up.
 */
describe('getAllBuildingsForSignUp', () => {
  /**
   * Test case for retrieving all buildings available for user sign-up.
   * It checks if the service returns a complete list of buildings.
   */
  it('should return all buildings for sign up', async () => {
    const mockBuildings = [{ id: 1, name: 'Building 1' }, { id: 2, name: 'Building 2' }];
    dataLayer.getAllBuildingsForSignUp.mockResolvedValue(mockBuildings);

    const result = await buildingsService.getAllBuildingsForSignUp();
    expect(result).toEqual(mockBuildings);
  });
 /**
   * Test case for handling errors during the fetching of buildings.
   * It expects the service to throw an error when there is an issue in fetching building data.
   */
  it('should handle an error', async () => {
    dataLayer.getAllBuildingsForSignUp.mockRejectedValue(new Error('Error fetching buildings'));

    await expect(buildingsService.getAllBuildingsForSignUp()).rejects.toThrow('Error fetching buildings');
  });
});

describe('Building Service Module - getBuildingInfo', () => {
    it('should call dataLayer.getBuildingInfo with the provided user_id and return the result', async () => {
      // Arrange
      const user_id = '123';
      const mockBuildingInfo = { /* mock building info */ };
  
      // Mocking the dataLayer.getBuildingInfo function
      dataLayer.getBuildingInfo.mockResolvedValue(mockBuildingInfo);
  
      // Act
      const result = await buildingsService.getBuildingInfo(user_id);
  
      // Assert
      expect(dataLayer.getBuildingInfo).toHaveBeenCalledWith(user_id);
      expect(result).toEqual(mockBuildingInfo);
    });
  
    it('should handle errors during getBuildingInfo', async () => {
      // Arrange
      const user_id = '123';
  
      // Mocking the dataLayer.getBuildingInfo function to throw an error
      dataLayer.getBuildingInfo.mockRejectedValue(new Error('Some error occurred'));
  
      // Act and Assert
      await expect(buildingsService.getBuildingInfo(user_id)).rejects.toThrow('Some error occurred');
    });
  });



