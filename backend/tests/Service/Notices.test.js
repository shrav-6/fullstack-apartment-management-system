

const noticeService = require('../../service/Notices');
const data = require("../../data/Notices");

jest.mock("../../data/Notices");
/**
 * Test suite for 'getNoticeById' function in the notice service.
 * It tests retrieving a specific notice by its ID.
 */
describe('getNoticeById', () => {
   /**
   * Test case for successfully retrieving a notice with a valid ID.
   * It checks if the service correctly returns the notice data.
   */
  it('should return a notice for a valid ID', async () => {
    const mockNotice = { id: 1, title: 'Notice 1', description: 'Description here' };
    data.getNoticeById.mockResolvedValue(mockNotice);

    const result = await noticeService.getNoticeById(1, 'tenant', 123);
    expect(result).toEqual(mockNotice);
  });

  /**
   * Test case for handling errors when a non-existent ID is provided.
   * It expects the service to throw an error for invalid notice IDs.
   */
  it('should throw an error for an invalid ID', async () => {
    data.getNoticeById.mockRejectedValue(new Error('Notice not found'));

    await expect(noticeService.getNoticeById(999, 'tenant', 123)).rejects.toThrow('Notice not found');
  });
});

/**
 * Test suite for 'getAllNoticesTenant' function in the notice service.
 * It tests retrieving all notices for a tenant.
 */
describe('getAllNoticesTenant', () => {
    /**
   * Test case for retrieving all notices available to a tenant.
   * It verifies if the service returns a comprehensive list of notices for tenants.
   */
    it('should return all notices for a tenant', async () => {
      const mockNotices = [{ id: 1, title: 'Notice 1' }, { id: 2, title: 'Notice 2' }];
      data.getAllNoticesTenant.mockResolvedValue(mockNotices);
  
      const result = await noticeService.getAllNoticesTenant('tenant', 123);
      expect(result).toEqual(mockNotices);
    });
    /**
   * Test case for handling errors when an unauthorized role attempts access.
   * It expects the service to throw an error for invalid or unauthorized roles.
   */
  
    it('should throw an error for an invalid role', async () => {
      data.getAllNoticesTenant.mockRejectedValue(new Error('Unauthorized role'));
  
      await expect(noticeService.getAllNoticesTenant('guest', 123)).rejects.toThrow('Unauthorized role');
    });
  });
  /**
 * Test suite for 'getAllNoticesManager' function in the notice service.
 * It tests retrieving all notices available to a manager.
 */
  describe('getAllNoticesManager', () => {
      /**
   * Test case for retrieving all notices available to a manager.
   * It checks if the service correctly returns a list of notices for managers.
   */
    it('should return all notices for a manager', async () => {
      const mockNotices = [{ id: 1, title: 'Notice 1' }, { id: 2, title: 'Notice 2' }];
      data.getAllNoticesManager.mockResolvedValue(mockNotices);
  
      const result = await noticeService.getAllNoticesManager('manager', 123, 'Building1');
      expect(result).toEqual(mockNotices);
    });
    /**
    * Test case for handling errors when an unauthorized role attempts access.
    * It expects the service to throw an error for invalid or unauthorized roles.
    */
    it('should throw an error for an invalid role', async () => {
      data.getAllNoticesManager.mockRejectedValue(new Error('Unauthorized role'));
  
      await expect(noticeService.getAllNoticesManager('guest', 123, 'Building1')).rejects.toThrow('Unauthorized role');
    });
  });
  /**
 * Test suite for 'createNotice' function in the notice service.
 * It tests the creation of a new notice.
 */
  describe('createNotice', () => {
      /**
   * Test case for successfully creating a new notice.
   * It checks if the service correctly creates a notice with the provided data.
   */
    it('should create a new notice', async () => {
      const mockNotice = { title: 'New Notice', description: 'Description here', dateAndTime: '2023-01-01 10:00' };
      data.createNotice.mockResolvedValue({ id: 3, ...mockNotice });
  
      const result = await noticeService.createNotice(mockNotice, 123, 'manager', 'Building1');
      expect(result).toMatchObject(mockNotice);
    });
    /**
   * Test case for handling errors when provided with incomplete notice data.
   * It expects the service to throw an error for incomplete data submissions.
   */
  
    it('should throw an error with incomplete notice data', async () => {
      data.createNotice.mockRejectedValue(new Error('Incomplete notice data'));
  
      await expect(noticeService.createNotice({}, 123, 'manager', 'Building1')).rejects.toThrow('Incomplete notice data');
    });
  });
  /**
 * Test suite for 'deleteNotice' function in the notice service.
 * It tests the deletion of a notice.
 */
  describe('deleteNotice', () => {
     /**
   * Test case for successfully deleting a notice.
   * It verifies if the service correctly deletes a notice given its ID.
   */
    it('should delete a notice', async () => {
      data.deleteNotice.mockResolvedValue({ message: 'Notice deleted successfully' });
  
      const result = await noticeService.deleteNotice(1, 123, 'manager');
      expect(result).toEqual({ message: 'Notice deleted successfully' });
    });
   /**
   * Test case for handling errors when attempting to delete a non-existent notice.
   * It expects the service to throw an error for non-existent notice IDs.
   */
    it('should throw an error for a non-existent notice', async () => {
      data.deleteNotice.mockRejectedValue(new Error('Notice not found'));
  
      await expect(noticeService.deleteNotice(999, 123, 'manager')).rejects.toThrow('Notice not found');
    });
  });
  /**
 * Test suite for 'updateNotice' function in the notice service.
 * It tests the updating of notice details.
 */
  describe('updateNotice', () => {
    /**
   * Test case for successfully updating a notice's details.
   * It checks if the service correctly updates the notice with new information.
   */
    it('should update a notice', async () => {
      const updatedInfo = { title: 'Updated Notice', description: 'Updated Description', dateAndTime: '2023-01-02 11:00' };
      data.updateNotice.mockResolvedValue({ id: 1, ...updatedInfo });
  
      const result = await noticeService.updateNotice(1, updatedInfo.title, updatedInfo.description, updatedInfo.dateAndTime, 123, 'manager');
      expect(result).toMatchObject(updatedInfo);
    });

    /**
   * Test case for handling errors with incomplete update information.
   * It expects the service to throw an error when update details are incomplete.
   */
  
    it('should throw an error with incomplete update information', async () => {
      data.updateNotice.mockRejectedValue(new Error('Incomplete update information'));
  
      await expect(noticeService.updateNotice(1, '', '', '', 123, 'manager')).rejects.toThrow('Incomplete update information');
    });
  });
          