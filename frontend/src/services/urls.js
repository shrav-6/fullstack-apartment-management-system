const baseUrl = 'http://172.17.0.237:8074/';

export const noticesService = {
  getAllNotices: `${baseUrl}Notices`,
  getAllNoticeById: `${baseUrl}Notices/id`,
  editAllNotices: `${baseUrl}Notices/:id`,
  deleteNotice: `${baseUrl}Notices/:id`,
  postAllNotices: `${baseUrl}Notices`,
  getAllNoticesForManager: `${baseUrl}Notices/manager/:buildingId`,
};

export const newsfeedService = {
  getAllNewsfeed: `${baseUrl}NewsFeeds`,
  getAllNewsfeedById: `${baseUrl}NewsFeeds/id`,
  editAllNewsfeed: `${baseUrl}NewsFeeds/:id`,
  deleteNewfeed: `${baseUrl}NewsFeeds/:id`,
  postAllNewsfeed: `${baseUrl}NewsFeeds`,
  getAllNewsfeedForManager: `${baseUrl}NewsFeed/manager/:buildingId`,
};

export const buildingService = {
  getAllBuilding: `${baseUrl}Buildings`,
  postAllBuilding: `${baseUrl}Buildings`,
  // getAllNewsfeedForManager: `${baseUrl}NewsFeed/manager/:buildingId`,
};
