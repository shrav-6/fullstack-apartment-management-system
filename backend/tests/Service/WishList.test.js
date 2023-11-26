
const wishListService=require('../../service/Wishlist');
const dataLayer = require('../../data/WishList');

jest.mock('../../data/WishList');
/**
 * Test suite for 'getWishlistedListings' function in the wish list service.
 * It tests the retrieval of wishlisted listings for an authenticated user.
 */

describe('getWishlistedListings', () => {
  /**
   * Test case for successfully retrieving wishlisted listings.
   * It checks if the service correctly returns the listings for a given user.
   */
  it('should return wishlisted listings for an authenticated user', async () => {
    const mockUser = { id: 1 };
    const mockListings = [{ id: 101, unitAvailable: true, rent: 1000 }];
    dataLayer.getUserWishlists.mockResolvedValue([101]);
    dataLayer.getUniqueListingIds.mockResolvedValue([101]);
    dataLayer.getListingsByUniqueIds.mockResolvedValue(mockListings);

    const req = { user: mockUser };
    const res = { json: jest.fn() };

    await wishListService.getWishlistedListings(req, res);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Retrieved successfully',
      data: expect.any(Array),
    });
  });
    /**
   * Test case for handling errors during wishlist retrieval.
   * It expects the service to return an error when there are issues accessing the database.
   */

  it('should handle errors', async () => {
    const mockUser = { id: 3 };
    dataLayer.getUserWishlists.mockRejectedValue(new Error('Database error'));

    const req = { user: mockUser };
    const res = { json: jest.fn() };

    await wishListService.getWishlistedListings(req, res);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: 'An error occurred while retrieving data',
    });
  });
});

/**
 * Test suite for 'addWishlistItem' function in the wish list service.
 * It tests the addition of a listing to a user's wishlist.
 */
describe('addWishlistItem', () => {
   /**
   * Test case for adding a listing to the wishlist of an authenticated user.
   * It verifies if the service correctly adds the item and returns a success message.
   */
  it('should add a wishlist item for an authenticated user', async () => {
    const mockReqBody = { listingId: 101, status: true };
    const mockUser = { id: 1 };
    dataLayer.findListingById.mockResolvedValue({ id: 101 });

    const req = { user: mockUser, body: mockReqBody };
    const res = { json: jest.fn() };

    await wishListService.addWishlistItem(req, res);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Successfully wishlisted",
    });
  });
  /**
   * Test case for handling errors and invalid inputs during wishlist addition.
   * It expects the service to return an error for invalid listings or statuses.
   */

  it('should return an error for an invalid listing or status', async () => {
    const mockReqBody = { listingId: 999, status: false };
    const mockUser = { id: 1 };
    dataLayer.findListingById.mockResolvedValue(null);

    const req = { user: mockUser, body: mockReqBody };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await wishListService.addWishlistItem(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: "Listing not found or invalid status",
    });
  });

  it('should handle errors', async () => {
    const mockReqBody = { listingId: 101, status: true };
    const mockUser = { id: 1 };
    dataLayer.findListingById.mockRejectedValue(new Error('Database error'));

    const req = { user: mockUser, body: mockReqBody };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await wishListService.addWishlistItem(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: "An error occurred while processing the request",
    });
  });
});
/**
 * Test suite for 'removeWishlistItem' function in the wish list service.
 * It tests the removal of a listing from a user's wishlist.
 */
describe('removeWishlistItem', () => {
    /**
   * Test case for removing a listing from the wishlist of an authenticated user.
   * It checks if the service correctly removes the item and returns a success message.
   */
  it('should remove a wishlist item for an authenticated user', async () => {
    const mockReqBody = { listingId: 101 };
    const mockUser = { id: 1 };
    dataLayer.findWishlistItem.mockResolvedValue({ id: 101 });

    const req = { user: mockUser, body: mockReqBody };
    const res = { json: jest.fn() };

    await wishListService.removeWishlistItem(req, res);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Successfully removed from wishlist",
    });
  });
   /**
   * Test case for handling errors and invalid inputs during wishlist item removal.
   * It expects the service to return an error for non-existent wishlist items.
   */

  it('should return an error for a non-existent wishlist item', async () => {
    const mockReqBody = { listingId: 999 };
    const mockUser = { id: 1 };
    dataLayer.findWishlistItem.mockResolvedValue(null);

    const req = { user: mockUser, body: mockReqBody };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await wishListService.removeWishlistItem(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: "Wishlist item not found or unauthorized to delete",
    });
  });

  it('should handle errors', async () => {
    const mockReqBody = { listingId: 101 };
    const mockUser = { id: 1 };
    dataLayer.findWishlistItem.mockRejectedValue(new Error('Database error'));

    const req = { user: mockUser, body: mockReqBody };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await wishListService.removeWishlistItem(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: "An error occurred while processing the request",
    });
  });
});

