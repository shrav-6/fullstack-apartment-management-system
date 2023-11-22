

const noticeService = require('../../Service/Notices');
const data = require("../../Data/Notices");

jest.mock("../../Data/Notices");

describe('getNoticeById', () => {
  it('should return a notice for a valid ID', async () => {
    const mockNotice = { id: 1, title: 'Notice 1', description: 'Description here' };
    data.getNoticeById.mockResolvedValue(mockNotice);

    const result = await noticeService.getNoticeById(1, 'tenant', 123);
    expect(result).toEqual(mockNotice);
  });

  it('should throw an error for an invalid ID', async () => {
    data.getNoticeById.mockRejectedValue(new Error('Notice not found'));

    await expect(noticeService.getNoticeById(999, 'tenant', 123)).rejects.toThrow('Notice not found');
  });
});
describe('getAllNoticesTenant', () => {
    it('should return all notices for a tenant', async () => {
      const mockNotices = [{ id: 1, title: 'Notice 1' }, { id: 2, title: 'Notice 2' }];
      data.getAllNoticesTenant.mockResolvedValue(mockNotices);
  
      const result = await noticeService.getAllNoticesTenant('tenant', 123);
      expect(result).toEqual(mockNotices);
    });
  
    it('should throw an error for an invalid role', async () => {
      data.getAllNoticesTenant.mockRejectedValue(new Error('Unauthorized role'));
  
      await expect(noticeService.getAllNoticesTenant('guest', 123)).rejects.toThrow('Unauthorized role');
    });
  });
  describe('getAllNoticesManager', () => {
    it('should return all notices for a manager', async () => {
      const mockNotices = [{ id: 1, title: 'Notice 1' }, { id: 2, title: 'Notice 2' }];
      data.getAllNoticesManager.mockResolvedValue(mockNotices);
  
      const result = await noticeService.getAllNoticesManager('manager', 123, 'Building1');
      expect(result).toEqual(mockNotices);
    });
  
    it('should throw an error for an invalid role', async () => {
      data.getAllNoticesManager.mockRejectedValue(new Error('Unauthorized role'));
  
      await expect(noticeService.getAllNoticesManager('guest', 123, 'Building1')).rejects.toThrow('Unauthorized role');
    });
  });
  describe('createNotice', () => {
    it('should create a new notice', async () => {
      const mockNotice = { title: 'New Notice', description: 'Description here', dateAndTime: '2023-01-01 10:00' };
      data.createNotice.mockResolvedValue({ id: 3, ...mockNotice });
  
      const result = await noticeService.createNotice(mockNotice, 123, 'manager', 'Building1');
      expect(result).toMatchObject(mockNotice);
    });
  
    it('should throw an error with incomplete notice data', async () => {
      data.createNotice.mockRejectedValue(new Error('Incomplete notice data'));
  
      await expect(noticeService.createNotice({}, 123, 'manager', 'Building1')).rejects.toThrow('Incomplete notice data');
    });
  });
  describe('deleteNotice', () => {
    it('should delete a notice', async () => {
      data.deleteNotice.mockResolvedValue({ message: 'Notice deleted successfully' });
  
      const result = await noticeService.deleteNotice(1, 123, 'manager');
      expect(result).toEqual({ message: 'Notice deleted successfully' });
    });
  
    it('should throw an error for a non-existent notice', async () => {
      data.deleteNotice.mockRejectedValue(new Error('Notice not found'));
  
      await expect(noticeService.deleteNotice(999, 123, 'manager')).rejects.toThrow('Notice not found');
    });
  });
  describe('updateNotice', () => {
    it('should update a notice', async () => {
      const updatedInfo = { title: 'Updated Notice', description: 'Updated Description', dateAndTime: '2023-01-02 11:00' };
      data.updateNotice.mockResolvedValue({ id: 1, ...updatedInfo });
  
      const result = await noticeService.updateNotice(1, updatedInfo.title, updatedInfo.description, updatedInfo.dateAndTime, 123, 'manager');
      expect(result).toMatchObject(updatedInfo);
    });
  
    it('should throw an error with incomplete update information', async () => {
      data.updateNotice.mockRejectedValue(new Error('Incomplete update information'));
  
      await expect(noticeService.updateNotice(1, '', '', '', 123, 'manager')).rejects.toThrow('Incomplete update information');
    });
  });
          