const baseUrl = 'http://172.17.0.237:8074/';

export const noticesService = {
  getAllNotices: `${baseUrl}Notices`,
  getAllNoticeById: `${baseUrl}Notices/id`,
  editAllNotices: `${baseUrl}notices/:id`,
  deleteNotice: `${baseUrl}Notices/:id`,
  postAllNotices: `${baseUrl}notices`,
};
