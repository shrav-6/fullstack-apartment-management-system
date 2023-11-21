const baseUrl = 'http://localhost:3001/';

export const noticesService = {
  getAllNotices: `${baseUrl}Notices`,
  getAllNoticeById: `${baseUrl}Notices/id`,
  editAllNotices: `${baseUrl}notices/:id`,
  deleteNotice: `${baseUrl}Notices/:id`,
  postAllNotices: `${baseUrl}notices`,
  getAllNoticesForManager: `${baseUrl}Notices/manager/:buildingId`,
};
