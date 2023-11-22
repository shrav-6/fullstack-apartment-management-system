

const buildingsService = require('../../Service/Buildings');
const dataLayer = require("../../Data/Buildings");

jest.mock("../../Data/Buildings");

describe('getBuildingById', () => {
  it('should return a building for a valid ID', async () => {
    const mockBuilding = { id: 1, name: 'Building 1' };
    dataLayer.getBuildingById.mockResolvedValue(mockBuilding);

    const result = await buildingsService.getBuildingById(1, 'admin', 123);
    expect(result).toEqual(mockBuilding);
  });

  it('should throw an error for an invalid ID', async () => {
    dataLayer.getBuildingById.mockRejectedValue(new Error('Building not found'));

    await expect(buildingsService.getBuildingById(999, 'admin', 123)).rejects.toThrow('Building not found');
  });
});

describe('getAllBuildings', () => {
  it('should return all buildings for a valid user role', async () => {
    const mockBuildings = [{ id: 1, name: 'Building 1' }, { id: 2, name: 'Building 2' }];
    dataLayer.getAllBuildings.mockResolvedValue(mockBuildings);

    const result = await buildingsService.getAllBuildings('admin', 123);
    expect(result).toEqual(mockBuildings);
  });

  it('should throw an error for an invalid role', async () => {
    dataLayer.getAllBuildings.mockRejectedValue(new Error('Unauthorized role'));

    await expect(buildingsService.getAllBuildings('guest', 123)).rejects.toThrow('Unauthorized role');
  });
});
describe('createBuilding', () => {
  it('should create a new building', async () => {
    const mockBuildingData = { name: 'New Building', address: '123 Street' };
    dataLayer.createBuilding.mockResolvedValue({ id: 3, ...mockBuildingData });

    const result = await buildingsService.createBuilding(mockBuildingData, 123, 'admin', 'New Building');
    expect(result).toMatchObject(mockBuildingData);
  });

  it('should throw an error with incomplete data', async () => {
    dataLayer.createBuilding.mockRejectedValue(new Error('Incomplete data'));

    await expect(buildingsService.createBuilding({}, 123, 'admin', '')).rejects.toThrow('Incomplete data');
  });
});
describe('deleteBuilding', () => {
  it('should delete a building', async () => {
    dataLayer.deleteBuilding.mockResolvedValue({ message: 'Building deleted successfully' });

    const result = await buildingsService.deleteBuilding(1, 123, 'admin');
    expect(result).toEqual({ message: 'Building deleted successfully' });
  });

  it('should throw an error for a non-existent building', async () => {
    dataLayer.deleteBuilding.mockRejectedValue(new Error('Building not found'));

    await expect(buildingsService.deleteBuilding(999, 123, 'admin')).rejects.toThrow('Building not found');
  });
});

describe('updateBuilding', () => {
  it('should update a building', async () => {
    const updatedInfo = { name: 'Updated Building', address: '456 Avenue', phoneNumber: '1234567890' };

    // Mock the expected resolved value
    dataLayer.updateBuilding.mockResolvedValue({ id: 1, ...updatedInfo });

    // Pass each property of updatedInfo as a separate argument
    const result = await buildingsService.updateBuilding(1, updatedInfo.name, updatedInfo.address, updatedInfo.phoneNumber, 123, 'admin');

    // Check if the result matches the updated information
    expect(result).toMatchObject(updatedInfo);
  });

  it('should throw an error with incomplete update information', async () => {
    dataLayer.updateBuilding.mockRejectedValue(new Error('Incomplete update information'));

    await expect(buildingsService.updateBuilding(1, '', '', '', 123, 'admin')).rejects.toThrow('Incomplete update information');
  });
});

describe('getAllBuildingsForSignUp', () => {
  it('should return all buildings for sign up', async () => {
    const mockBuildings = [{ id: 1, name: 'Building 1' }, { id: 2, name: 'Building 2' }];
    dataLayer.getAllBuildingsForSignUp.mockResolvedValue(mockBuildings);

    const result = await buildingsService.getAllBuildingsForSignUp();
    expect(result).toEqual(mockBuildings);
  });

  it('should handle an error', async () => {
    dataLayer.getAllBuildingsForSignUp.mockRejectedValue(new Error('Error fetching buildings'));

    await expect(buildingsService.getAllBuildingsForSignUp()).rejects.toThrow('Error fetching buildings');
  });
});



