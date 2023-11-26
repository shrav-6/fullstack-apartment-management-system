const listingsService = require('../../service/Listings');
const dataLayer = require("../../data/Listings");

jest.mock("../../data/Listings");

/**
 * Test suite for the 'createListing' function in the listings service.
 * It tests the creation of a new listing.
 */
describe('createListing', () => {
   /**
   * Test case for successfully creating a new listing.
   * It checks if the service correctly creates a listing with the provided data.
   */
  it('should create a new listing', async () => {
    const mockListing = { title: 'New Listing', description: 'Description here', price: 100 };
    dataLayer.createListing.mockResolvedValue(mockListing);

    const result = await listingsService.createListing(mockListing, 123, 'manager', 'Building1');
    expect(result).toEqual(mockListing);
  });


});
/**
 * Test suite for 'getAllListingsForBuilding' function in the listings service.
 * It tests retrieving all listings associated with a specific building.
 */
describe('getAllListingsForBuilding', () => {
  /**
   * Test case for retrieving all listings for a specific building.
   * It verifies if the service returns the correct list of listings.
   */
  it('should retrieve all listings for a building', async () => {
    const mockListings = [{ id: 1, title: 'Listing 1' }, { id: 2, title: 'Listing 2' }];
    dataLayer.getAllListingsForBuilding.mockResolvedValue(mockListings);

    const result = await listingsService.getAllListingsForBuilding(123, 'Building1', 'manager');
    expect(result).toEqual(mockListings);
  });

});

/**
 * Test suite for 'getAllListingsForPublicView' function in the listings service.
 * It tests the retrieval of all listings available for public view.
 */
describe('getAllListingsForPublicView', () => {
    /**
   * Test case for retrieving all listings available for public view.
   * It checks if the service returns a comprehensive list of public listings.
   */
  it('should return all listings available for public view', async () => {
    const mockListings = [{ id: 1, title: 'Public Listing 1' }, { id: 2, title: 'Public Listing 2' }];
    dataLayer.getAllListingsForPublicView.mockResolvedValue(mockListings);

    const result = await listingsService.getAllListingsForPublicView();
    expect(result).toEqual(mockListings);
  });


});
/**
 * Test suite for 'getListingById' function in the listings service.
 * It tests retrieving a specific listing by its ID.
 */
describe('getListingById', () => {
   /**
   * Test case for successfully retrieving a listing by its ID.
   * It ensures that the service correctly returns the requested listing data.
   */
  it('should retrieve a listing by its ID', async () => {
    const mockListing = { id: 1, title: 'Listing 1', description: 'Description here' };
    dataLayer.getListingById.mockResolvedValue(mockListing);

    const result = await listingsService.getListingById(1, 123, 'manager');
    expect(result).toEqual(mockListing);
  });

});

/**
 * Test suite for 'updateListing' function in the listings service.
 * It tests the updating of listing details.
 */
describe('updateListing', () => {
  /**
   * Test case for successfully updating a listing.
   * It checks if the service correctly updates the listing with provided new data.
   */
  it('should update a listing based on listingId', async () => {
    const updatedData = { title: 'Updated Listing', description: 'Updated Description' };
    dataLayer.updateListing.mockResolvedValue({ ...updatedData, id: 1 });

    const result = await listingsService.updateListing(1, updatedData, 123, 'manager');
    expect(result).toMatchObject(updatedData);
  });

});
/**
 * Test suite for 'deleteListing' function in the listings service.
 * It tests the deletion of a listing.
 */
describe('deleteListing', () => {
   /**
   * Test case for successfully deleting a listing.
   * It verifies if the service correctly deletes a listing given its ID.
   */
  it('should delete a listing based on listingId', async () => {
    dataLayer.deleteListing.mockResolvedValue({ message: 'Listing deleted successfully' });

    const result = await listingsService.deleteListing(1, 123, 'manager');
    expect(result).toEqual({ message: 'Listing deleted successfully' });
  });

});

