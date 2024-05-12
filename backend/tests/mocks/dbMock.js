const actualDb = jest.requireActual('../../models');

// Mock for the buildings model
const buildingsMock = {
  ...actualDb.buildings,
  findOne: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  destroy: jest.fn(),
  update: jest.fn(),
};

// Mock for the listings model
const listingsMock = {
  ...actualDb.listings,
  findOne: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  destroy: jest.fn(),
  update: jest.fn(),
};

// Mock for the managers model
const managersMock = {
  ...actualDb.managers,
  findOne: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  destroy: jest.fn(),
  update: jest.fn(),
};

// Mock for the users model
const usersMock = {
  ...actualDb.users,
  findOne: jest.fn(),
  create: jest.fn(),
};


// Mock for the tenants model
const tenantsMock = {
  ...actualDb.tenants,
  findOne: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  destroy: jest.fn(),
  update: jest.fn(),
};

// Mock for the notices model
const noticesMock = {
  ...actualDb.notices,
  findOne: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  destroy: jest.fn(),
  update: jest.fn(),
};

// Mock for the newsfeeds model
const newsfeedsMock = {
  ...actualDb.newsfeeds,
  findOne: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  destroy: jest.fn(),
  update: jest.fn(),
};

const wishlistsMock = {
  ...actualDb.wishlists,
  findOne: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  destroy: jest.fn(),
  update: jest.fn(),
};
const applicationsMock = {
  ...actualDb.applications,
  findOne: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  destroy: jest.fn(),
  update: jest.fn(),
};


module.exports = {
  buildings: buildingsMock,
  listings: listingsMock,
  managers: managersMock,
  users: usersMock,
  tenants: tenantsMock,
  notices: noticesMock,
  newsfeeds: newsfeedsMock,
  wishlists: wishlistsMock,
  applications: applicationsMock,
};
