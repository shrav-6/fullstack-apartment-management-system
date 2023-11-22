// const buildingsData = require('../../Data/Buildings');
// const { buildings, managers,listings } = require("../../Models");

// jest.mock("../../Models");
// describe('ListingsData Tests', () => {
//     beforeEach(() => {
//       // Resetting mocks before each test
//       managers.findOne.mockReset();
//       buildings.findOne.mockReset();
//       listings.create.mockReset();
//     });
//     it('should retrieve a building by ID for a manager', async () => {
//         managers.findOne.mockResolvedValue({ id: 1, userId: 123 });
//         buildings.findOne.mockResolvedValue({ id: 1, buildingName: 'Building 1', managerId: 1 });
      
//         const result = await buildingsData.getBuildingById(1, 'Manager', 123);
//         expect(result).toEqual(expect.any(Object));
//       });
//       it('should return null for an invalid role when retrieving building by ID', async () => {
//         const result = await buildingsData.getBuildingById(1, 'Tenant', 123);
//         expect(result).toBeNull();
//       });
      
//       it('should retrieve all buildings for a manager', async () => {
//         managers.findOne.mockResolvedValue({ id: 1, userId: 123 });
//         buildings.findAll.mockResolvedValue([{ id: 1, buildingName: 'Building 1' }]);
      
//         const result = await buildingsData.getAllBuildings('Manager', 123);
//         expect(result).toEqual(expect.arrayContaining([expect.any(Object)]));
//       });
//     //   it('should create a new building successfully for a manager', async () => {
//     //     managers.findOne.mockResolvedValue({ id: 1, userId: 123 });
//     //     buildings.findOne.mockResolvedValue(null);
//     //     buildings.create.mockResolvedValue({});
      
//     //     const buildingData = { buildingName: 'Building 2', address: '456 Elm St', phoneNumber: '123-456-7890' };
//     //     const result = await buildingsData.createBuilding(buildingData, 123, 'Manager', 'Building 2');
//     //     expect(result).toBe(true);
//     //   });
//       it('should return false if building with the same name already exists', async () => {
//         managers.findOne.mockResolvedValue({ id: 1, userId: 123 });
//         buildings.findOne.mockResolvedValue({ id: 2, buildingName: 'Building 2', managerId: 1 });
      
//         const buildingData = { buildingName: 'Building 2', address: '456 Elm St', phoneNumber: '123-456-7890' };
//         const result = await buildingsData.createBuilding(buildingData, 123, 'Manager', 'Building 2');
//         expect(result).toBe(false);
//       });
//       it('should delete a building successfully for a manager', async () => {
//         managers.findOne.mockResolvedValue({ id: 1, userId: 123 });
//         buildings.findOne.mockResolvedValue({ id: 1, buildingName: 'Building 1', managerId: 1 });
//         buildings.destroy.mockResolvedValue(1);
      
//         const result = await buildingsData.deleteBuilding(1, 123, 'Manager');
//         expect(result).toBe(true);
//       });
//       it('should update a building successfully for a manager', async () => {
//         managers.findOne.mockResolvedValue({ id: 1, userId: 123 });
//         buildings.findOne.mockResolvedValue({ id: 1, buildingName: 'Building 1', managerId: 1 });
//         buildings.update.mockResolvedValue([1]);
      
//         const result = await buildingsData.updateBuilding(1, 'New Building 1', 'New Address', '987-654-3210', 123, 'Manager');
//         expect(result).toBe(true);
//       });
      
//       it('should retrieve all building names for signup', async () => {
//         buildings.findAll.mockResolvedValue([{ buildingName: 'Building 1' }, { buildingName: 'Building 2' }]);
      
//         const result = await buildingsData.getAllBuildingsForSignUp();
//         expect(result).toEqual(expect.arrayContaining([expect.objectContaining({ buildingName: expect.any(String) })]));
//       });
//     //   it('should return null if no buildings are found for signup', async () => {
//     //     buildings.findAll.mockResolvedValue([]);
      
//     //     const result = await buildingsData.getAllBuildingsForSignUp();
//     //     expect(result).toBeNull();
//     //   });
            

// });
const buildingService = require("../../Data/Buildings");
const { buildings, managers } = require("../../Models");

jest.mock("../../Models");

describe('getBuildingById', () => {
  it('should retrieve a building by ID for a manager', async () => {
    const buildingId = 1;
    const managerId = 123;
    managers.findOne.mockResolvedValue({ id: managerId, userId: 456 });
    buildings.findOne.mockResolvedValue({ id: buildingId, managerId: managerId });

    const result = await buildingService.getBuildingById(buildingId, 'Manager', 456);
    expect(result).toEqual({ id: buildingId, managerId: managerId });
  });

  it('should return null if the manager is not found', async () => {
    managers.findOne.mockResolvedValue(null);

    const result = await buildingService.getBuildingById(1, 'Manager', 456);
    expect(result).toBeNull();
  });

  it('should return null if the building is not found for the manager', async () => {
    managers.findOne.mockResolvedValue({ id: 123, userId: 456 });
    buildings.findOne.mockResolvedValue(null);

    const result = await buildingService.getBuildingById(1, 'Manager', 456);
    expect(result).toBeNull();
  });

  it('should return null for an invalid role', async () => {
    const result = await buildingService.getBuildingById(1, 'InvalidRole', 456);
    expect(result).toBeNull();
  });

  it('should handle errors during retrieval', async () => {
    managers.findOne.mockRejectedValue(new Error('Database error'));

    await expect(buildingService.getBuildingById(1, 'Manager', 456)).rejects.toThrow('Database error');
  });
});

describe('getAllBuildings', () => {
  it('should retrieve all buildings for a manager', async () => {
    const managerId = 123;
    managers.findOne.mockResolvedValue({ id: managerId, userId: 456 });
    buildings.findAll.mockResolvedValue([{ id: 1, buildingName: 'Building 1', managerId: managerId }]);

    const result = await buildingService.getAllBuildings('Manager', 456);
    expect(result).toEqual([{ id: 1, buildingName: 'Building 1', managerId: managerId }]);
  });

  it('should return null if the manager is not found', async () => {
    managers.findOne.mockResolvedValue(null);

    const result = await buildingService.getAllBuildings('Manager', 456);
    expect(result).toBeNull();
  });

  it('should return null for an invalid role', async () => {
    const result = await buildingService.getAllBuildings('InvalidRole', 456);
    expect(result).toBeNull();
  });

  it('should handle errors during retrieval', async () => {
    managers.findOne.mockRejectedValue(new Error('Database error'));

    await expect(buildingService.getAllBuildings('Manager', 456)).rejects.toThrow('Database error');
  });
});

describe('createBuilding', () => {

  it('should return false if the manager is not found', async () => {
    managers.findOne.mockResolvedValue(null);

    const result = await buildingService.createBuilding({}, 456, 'Manager', 'New Building');
    expect(result).toBe(false);
  });

  it('should return false if the building with the same name already exists', async () => {
    const managerId = 123;
    managers.findOne.mockResolvedValue({ id: managerId, userId: 456 });
    buildings.findOne.mockResolvedValue({ id: 1, buildingName: 'Existing Building', managerId: managerId });

    const result = await buildingService.createBuilding({}, 456, 'Manager', 'Existing Building');
    expect(result).toBe(false);
  });

  it('should return false for an invalid role', async () => {
    const result = await buildingService.createBuilding({}, 456, 'InvalidRole', 'New Building');
    expect(result).toBe(false);
  });

  it('should handle errors during creation', async () => {
    managers.findOne.mockRejectedValue(new Error('Database error'));

    await expect(buildingService.createBuilding({}, 456, 'Manager', 'New Building')).rejects.toThrow('Database error');
  });
});

describe('deleteBuilding', () => {
  it('should delete a building for a manager', async () => {
    const managerId = 123;
    managers.findOne.mockResolvedValue({ id: managerId, userId: 456 });
    buildings.findOne.mockResolvedValue({ id: 1, buildingName: 'Building 1', managerId: managerId });

    const result = await buildingService.deleteBuilding(1, 456, 'Manager');
    expect(result).toBe(true);
  });

  it('should return false if the manager is not found', async () => {
    managers.findOne.mockResolvedValue(null);

    const result = await buildingService.deleteBuilding(1, 456, 'Manager');
    expect(result).toBe(false);
  });

  it('should return false if the building is not found for the manager', async () => {
    const managerId = 123;
    managers.findOne.mockResolvedValue({ id: managerId, userId: 456 });
    buildings.findOne.mockResolvedValue(null);

    const result = await buildingService.deleteBuilding(1, 456, 'Manager');
    expect(result).toBe(false);
  });

  it('should return false for an invalid role', async () => {
    const result = await buildingService.deleteBuilding(1, 456, 'InvalidRole');
    expect(result).toBe(false);
  });

  it('should handle errors during deletion', async () => {
    managers.findOne.mockRejectedValue(new Error('Database error'));

    await expect(buildingService.deleteBuilding(1, 456, 'Manager')).rejects.toThrow('Database error');
  });
});

describe('updateBuilding', () => {
  it('should update a building for a manager', async () => {
    const managerId = 123;
    managers.findOne.mockResolvedValue({ id: managerId, userId: 456 });
    buildings.findOne.mockResolvedValue({ id: 1, buildingName: 'Building 1', managerId: managerId });

    const result = await buildingService.updateBuilding(1, 'Updated Building', '456 Main St', '555-5678', 456, 'Manager');
    expect(result).toBe(true);
  });

  it('should return false if the manager is not found', async () => {
    managers.findOne.mockResolvedValue(null);

    const result = await buildingService.updateBuilding(1, 'Updated Building', '456 Main St', '555-5678', 456, 'Manager');
    expect(result).toBe(false);
  });

  it('should return false if the building is not found for the manager', async () => {
    const managerId = 123;
    managers.findOne.mockResolvedValue({ id: managerId, userId: 456 });
    buildings.findOne.mockResolvedValue(null);

    const result = await buildingService.updateBuilding(1, 'Updated Building', '456 Main St', '555-5678', 456, 'Manager');
    expect(result).toBe(false);
  });

  it('should return false for an invalid role', async () => {
    const result = await buildingService.updateBuilding(1, 'Updated Building', '456 Main St', '555-5678', 456, 'InvalidRole');
    expect(result).toBe(false);
  });

  it('should handle errors during update', async () => {
    managers.findOne.mockRejectedValue(new Error('Database error'));

    await expect(buildingService.updateBuilding(1, 'Updated Building', '456 Main St', '555-5678', 456, 'Manager')).rejects.toThrow('Database error');
  });
});

describe('getAllBuildingsForSignUp', () => {
  it('should retrieve building names for signup', async () => {
    buildings.findAll.mockResolvedValue([{ buildingName: 'Building 1' }, { buildingName: 'Building 2' }]);

    const result = await buildingService.getAllBuildingsForSignUp();
    expect(result).toEqual([{ buildingName: 'Building 1' }, { buildingName: 'Building 2' }]);
  });

  it('should handle errors during retrieval for signup', async () => {
    buildings.findAll.mockRejectedValue(new Error('Database error'));

    await expect(buildingService.getAllBuildingsForSignUp()).rejects.toThrow('Database error');
  });
});
