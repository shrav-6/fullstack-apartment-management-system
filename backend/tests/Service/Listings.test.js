const listingsService = require('../../Service/Listings');
const dataLayer = require("../../Data/Listings");

jest.mock("../../Data/Listings");

describe('createListing', () => {
  it('should create a new listing', async () => {
    const mockListing = { title: 'New Listing', description: 'Description here', price: 100 };
    dataLayer.createListing.mockResolvedValue(mockListing);

    const result = await listingsService.createListing(mockListing, 123, 'manager', 'Building1');
    expect(result).toEqual(mockListing);
  });

  // Additional test cases can include validation errors, permission errors, etc.
});

describe('getAllListingsForBuilding', () => {
  it('should retrieve all listings for a building', async () => {
    const mockListings = [{ id: 1, title: 'Listing 1' }, { id: 2, title: 'Listing 2' }];
    dataLayer.getAllListingsForBuilding.mockResolvedValue(mockListings);

    const result = await listingsService.getAllListingsForBuilding(123, 'Building1', 'manager');
    expect(result).toEqual(mockListings);
  });

  // Test cases for unauthorized access, invalid buildingId, etc., can be added here.
});

describe('getAllListingsForPublicView', () => {
  it('should return all listings available for public view', async () => {
    const mockListings = [{ id: 1, title: 'Public Listing 1' }, { id: 2, title: 'Public Listing 2' }];
    dataLayer.getAllListingsForPublicView.mockResolvedValue(mockListings);

    const result = await listingsService.getAllListingsForPublicView();
    expect(result).toEqual(mockListings);
  });

  // Include test cases for scenarios like no listings available, etc.
});
describe('getListingById', () => {
  it('should retrieve a listing by its ID', async () => {
    const mockListing = { id: 1, title: 'Listing 1', description: 'Description here' };
    dataLayer.getListingById.mockResolvedValue(mockListing);

    const result = await listingsService.getListingById(1, 123, 'manager');
    expect(result).toEqual(mockListing);
  });

  // Add test cases for invalid listingId, unauthorized access, etc.
});
describe('updateListing', () => {
  it('should update a listing based on listingId', async () => {
    const updatedData = { title: 'Updated Listing', description: 'Updated Description' };
    dataLayer.updateListing.mockResolvedValue({ ...updatedData, id: 1 });

    const result = await listingsService.updateListing(1, updatedData, 123, 'manager');
    expect(result).toMatchObject(updatedData);
  });

  // Include test cases for invalid listingId, insufficient permissions, incomplete data, etc.
});
describe('deleteListing', () => {
  it('should delete a listing based on listingId', async () => {
    dataLayer.deleteListing.mockResolvedValue({ message: 'Listing deleted successfully' });

    const result = await listingsService.deleteListing(1, 123, 'manager');
    expect(result).toEqual({ message: 'Listing deleted successfully' });
  });

  // Test cases for invalid listingId, unauthorized access, etc., can be added here.
});

