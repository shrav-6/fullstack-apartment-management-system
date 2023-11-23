const noticeService = require('../../Data/Notices');
const { notices, managers, tenants, buildings} = require("../../Models");

jest.mock("../../Models");

/**
 * Test suite for notice retrieval, creation, update, and deletion functionalities.
 */

// Tests for getNoticeById function
describe('getNoticeById', () => {
 
   /**
   * Test to verify retrieving a notice for a manager.
   * Checks if a manager can successfully fetch a notice by its ID.
   */
  it('should retrieve a notice for a manager', async () => {
    managers.findOne.mockResolvedValue({ id: 1, userId: 123 });
    notices.findOne.mockResolvedValue({ id: 1, title: 'Notice 1', managerId: 1 });

    const result = await noticeService.getNoticeById(1, 'Manager', 123);
    expect(result).toEqual(expect.any(Object));
  });

 /**
   * Test to verify retrieving a notice for a tenant.
   * Checks if a tenant can successfully fetch a notice related to their building.
   */
  it('should retrieve a notice for a tenant', async () => {
    tenants.findOne.mockResolvedValue({ id: 1, userId: 123, buildingId: 2 });
    notices.findOne.mockResolvedValue({ id: 1, title: 'Notice 1', buildingId: 2 });

    const result = await noticeService.getNoticeById(1, 'Tenant', 123);
    expect(result).toEqual(expect.any(Object));
  });
   
  /**
   * Test to verify that an invalid role cannot retrieve a notice.
   * Ensures that the function returns null when called with an unrecognized role.
   */
  it('should return null for an invalid role', async () => {
    const result = await noticeService.getNoticeById(1, 'InvalidRole', 123);
    expect(result).toBeNull();
  });

  /**
   * Test to verify the behavior when a manager is not found in the database.
   * Checks if the function returns null when the manager does not exist.
   */
  it('should return null if the manager is not found', async () => {
    managers.findOne.mockResolvedValue(null); // Manager not found
  
    const result = await noticeService.getNoticeById(1, 'Manager', 123);
    expect(result).toBeNull();
  });

  /**
   * Test to verify the behavior when a tenant is not found in the database.
   * Checks if the function returns null when the tenant does not exist.
   */
  it('should return null if the tenant is not found', async () => {
    tenants.findOne.mockResolvedValue(null); // Tenant not found
  
    const result = await noticeService.getNoticeById(1, 'Tenant', 123);
    expect(result).toBeNull();
  });

   /**
   * Test to verify the behavior when a notice is not found in the database.
   * Ensures that the function returns null if the notice does not exist for a manager.
   */
  it('should return null if the notice is not found', async () => {
    managers.findOne.mockResolvedValue({ id: 1, userId: 123 });
    notices.findOne.mockResolvedValue(null); // Notice not found for manager
  
    const result = await noticeService.getNoticeById(1, 'Manager', 123);
    expect(result).toBeNull();
  });
  
    /**
   * Test to verify the behavior when a notice is not found for a tenant.
   * Ensures that the function returns null if the notice relevant to the tenant does not exist.
   */
  it('should return null if the notice is not found for a tenant', async () => {
    tenants.findOne.mockResolvedValue({ id: 1, userId: 123, buildingId: 2 });
    notices.findOne.mockResolvedValue(null); // Notice not found for tenant
  
    const result = await noticeService.getNoticeById(1, 'Tenant', 123);
    expect(result).toBeNull();
  });

  /**
   * Test to handle errors during notice retrieval for a manager.
   * Verifies that the function correctly throws an error in case of database issues.
   */
  it('should handle errors during retrieval for a manager', async () => {
    managers.findOne.mockRejectedValue(new Error('Database error')); // Simulate database error
  
    await expect(noticeService.getNoticeById(1, 'Manager', 123)).rejects.toThrow('Database error');
  });
  
  /**
   * Test to handle errors during notice retrieval for a tenant.
   * Verifies that the function correctly throws an error in case of database issues.
   */
  it('should handle errors during retrieval for a tenant', async () => {
    tenants.findOne.mockRejectedValue(new Error('Database error')); // Simulate database error
  
    await expect(noticeService.getNoticeById(1, 'Tenant', 123)).rejects.toThrow('Database error');
  });
          
 
});

describe('getAllNoticesTenant', () => {
    it('should retrieve all notices for a tenant', async () => {
      tenants.findOne.mockResolvedValue({ id: 1, userId: 123, buildingId: 2 });
      notices.findAll.mockResolvedValue([{ id: 1, title: 'Notice 1' }]);
  
      const result = await noticeService.getAllNoticesTenant('Tenant', 123);
      expect(result).toEqual(expect.arrayContaining([expect.any(Object)]));
    });
    it('should return null for an invalid role', async () => {
        const result = await noticeService.getAllNoticesTenant('InvalidRole', 123);
        expect(result).toBeNull();
      });
      it('should return null if the tenant is not found', async () => {
        tenants.findOne.mockResolvedValue(null); // Tenant not found
      
        const result = await noticeService.getAllNoticesTenant('Tenant', 123);
        expect(result).toBeNull();
      });
      it('should return null if no notices are found for a tenant', async () => {
        tenants.findOne.mockResolvedValue({ id: 1, userId: 123, buildingId: 2 });
        notices.findAll.mockResolvedValue([]); // No notices found
      
        const result = await noticeService.getAllNoticesTenant('Tenant', 123);
        expect(result).toBeNull();
      });
      it('should handle errors during retrieval for a tenant', async () => {
        tenants.findOne.mockRejectedValue(new Error('Database error')); // Simulate database error
      
        await expect(noticeService.getAllNoticesTenant('Tenant', 123)).rejects.toThrow('Database error');
      });
                  
    
  });
  describe('getAllNoticesManager', () => {
    it('should retrieve all notices for a manager by building', async () => {
      managers.findOne.mockResolvedValue({ id: 1, userId: 123 });
      notices.findAll.mockResolvedValue([{ id: 1, title: 'Notice 1', buildingId: 2 }]);
  
      const result = await noticeService.getAllNoticesManager('Manager', 123, 2);
      expect(result).toEqual(expect.arrayContaining([expect.any(Object)]));
    });
    it('should return null for an invalid role', async () => {
        const result = await noticeService.getAllNoticesManager('InvalidRole', 123, 2);
        expect(result).toBeNull();
      });
      it('should return null if the manager is not found', async () => {
        managers.findOne.mockResolvedValue(null); // Manager not found
      
        const result = await noticeService.getAllNoticesManager('Manager', 123, 2);
        expect(result).toBeNull();
      });
      it('should return null if no notices are found', async () => {
        managers.findOne.mockResolvedValue({ id: 1, userId: 123 });
        notices.findAll.mockResolvedValue([]); // No notices found
      
        const result = await noticeService.getAllNoticesManager('Manager', 123, 2);
        expect(result).toBeNull();
      });
      it('should handle errors during retrieval', async () => {
        managers.findOne.mockRejectedValue(new Error('Database error')); // Simulate database error
      
        await expect(noticeService.getAllNoticesManager('Manager', 123, 2)).rejects.toThrow('Database error');
      });
                        
    
  });
   
  describe('createNotice', () => {
    it('should create a notice for a manager', async () => {
      managers.findOne.mockResolvedValue({ id: 1, userId: 123 });
      buildings.findOne.mockResolvedValue({ id: 2, buildingName: 'Building 1', managerId: 1 });
      notices.create.mockResolvedValue({});
  
      const notice = { title: 'New Notice', description: 'Description', dateAndTime: '2023-01-01' };
  
      const result = await noticeService.createNotice(notice, 123, 'Manager', 'Building 1');
      expect(result).toBe(true);
    });
    it('should return false for an invalid role', async () => {
        const notice = { title: 'New Notice', description: 'Description', dateAndTime: '2023-01-01' };
      
        const result = await noticeService.createNotice(notice, 123, 'InvalidRole', 'Building 1');
        expect(result).toBe(false);
      });
      
      it('should return false if the manager is not found', async () => {
        managers.findOne.mockResolvedValue(null); // Manager not found
      
        const notice = { title: 'New Notice', description: 'Description', dateAndTime: '2023-01-01' };
      
        const result = await noticeService.createNotice(notice, 123, 'Manager', 'Building 1');
        expect(result).toBe(false);
      });
      it('should return false if the building is not found', async () => {
        managers.findOne.mockResolvedValue({ id: 1, userId: 123 });
        buildings.findOne.mockResolvedValue(null); // Building not found
      
        const notice = { title: 'New Notice', description: 'Description', dateAndTime: '2023-01-01' };
      
        const result = await noticeService.createNotice(notice, 123, 'Manager', 'Nonexistent Building');
        expect(result).toBe(false);
      });
      it('should handle errors during creation', async () => {
        managers.findOne.mockRejectedValue(new Error('Database error')); // Simulate database error
      
        const notice = { title: 'New Notice', description: 'Description', dateAndTime: '2023-01-01' };
      
        await expect(noticeService.createNotice(notice, 123, 'Manager', 'Building 1')).rejects.toThrow('Database error');
      });
            
   
  });

  describe('deleteNotice', () => {
    it('should delete a notice for a manager', async () => {
      managers.findOne.mockResolvedValue({ id: 1, userId: 123 });
      notices.findOne.mockResolvedValue({ id: 1, managerId: 1 });
      notices.destroy.mockResolvedValue(1);
  
      const result = await noticeService.deleteNotice(1, 123, 'Manager');
      expect(result).toBe(true);
    });
    it('should return false for an invalid role', async () => {
        const result = await noticeService.deleteNotice(1, 123, 'InvalidRole');
        expect(result).toBe(false);
      });
      it('should return false if the manager is not found', async () => {
        managers.findOne.mockResolvedValue(null); // Manager not found
      
        const result = await noticeService.deleteNotice(1, 123, 'Manager');
        expect(result).toBe(false);
      });
      it('should return false if the notice is not found', async () => {
        managers.findOne.mockResolvedValue({ id: 1, userId: 123 });
        notices.findOne.mockResolvedValue(null); // Notice not found
      
        const result = await noticeService.deleteNotice(1, 123, 'Manager');
        expect(result).toBe(false);
      });
      it('should handle errors during deletion', async () => {
        managers.findOne.mockRejectedValue(new Error('Database error')); // Simulate database error
      
        await expect(noticeService.deleteNotice(1, 123, 'Manager')).rejects.toThrow('Database error');
      });

      
                  
  
    
  });

  describe('updateNotice', () => {
    it('should update a notice for a manager', async () => {
      managers.findOne.mockResolvedValue({ id: 1, userId: 123 });
      notices.findOne.mockResolvedValue({ id: 1, managerId: 1 });
      notices.update.mockResolvedValue([1]);
  
      const result = await noticeService.updateNotice(1, 'Updated Title', 'Updated Description', '2023-01-02', 123, 'Manager');
      expect(result).toBe(true);
    });
  
    it('should return false for an invalid role', async () => {
        const result = await noticeService.updateNotice(1, 'Updated Title', 'Updated Description', '2023-01-02', 123, 'InvalidRole');
        expect(result).toBe(false);
      });
      it('should return false if the manager is not found', async () => {
        managers.findOne.mockResolvedValue(null); // Manager not found
      
        const result = await noticeService.updateNotice(1, 'Updated Title', 'Updated Description', '2023-01-02', 123, 'Manager');
        expect(result).toBe(false);
      });
      it('should return false if the notice is not found', async () => {
        managers.findOne.mockResolvedValue({ id: 1, userId: 123 });
        notices.findOne.mockResolvedValue(null); // Notice not found
      
        const result = await noticeService.updateNotice(1, 'Updated Title', 'Updated Description', '2023-01-02', 123, 'Manager');
        expect(result).toBe(false);
      });
      it('should handle errors during update', async () => {
        managers.findOne.mockRejectedValue(new Error('Database error')); // Simulate database error
      
        await expect(noticeService.updateNotice(1, 'Updated Title', 'Updated Description', '2023-01-02', 123, 'Manager')).rejects.toThrow('Database error');
      });
      
                        
  });
  
