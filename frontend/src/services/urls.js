const baseUrl = 'http://localhost:3001/';

export const noticesService = {
  getAllNotices: `${baseUrl}Notices`,
  getAllNoticeById: `${baseUrl}Notices/id`,
  editAllNotices: `${baseUrl}notices/:id`,
  deleteNotice: `${baseUrl}Notices/:id`,
  postAllNotices: `${baseUrl}notices`,
  getAllNoticesForManager: `${baseUrl}Notices/manager/:buildingId`,
};

export const newsfeedService = {
  getAllNewsfeed: `${baseUrl}NewsFeed`,
  getAllNewsfeedById: `${baseUrl}NewsFeed/id`,
  editAllNewsfeed: `${baseUrl}NewsFeed/:id`,
  deleteNewfeed: `${baseUrl}NewsFeed/:id`,
  postAllNewsfeed: `${baseUrl}NewsFeed`,
  getAllNewsfeedForManager: `${baseUrl}NewsFeed/manager/:buildingId`,
};

export const buildingService = {
  getAllBuilding: `${baseUrl}Buildings`,
  postAllBuilding: `${baseUrl}Buildings`,
  // getAllNewsfeedForManager: `${baseUrl}NewsFeed/manager/:buildingId`,
};
