
const wishListService=require('../../Service/WishList');
const dataLayer = require('../../Data/WishList');

jest.mock('../../Data/WishList');

describe('getWishlistedListings', () => {
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

describe('addWishlistItem', () => {
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
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: "An error occurred while processing the request",
    });
  });
});

describe('removeWishlistItem', () => {
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
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: "An error occurred while processing the request",
    });
  });
});

