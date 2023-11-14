const baseUrl = 'http://localhost:3001/';

export const noticesService = {
  getAllNotices: `${baseUrl}notices`,
  getAllTheNotices: `${baseUrl}Notices`,
  getAllNoticeById: `${baseUrl}notices/id`,
  editAllNotices: `${baseUrl}notices/:id`,
  deleteNotice: `${baseUrl}notices/:id`,
  postAllNotices: `${baseUrl}notices`,
};
