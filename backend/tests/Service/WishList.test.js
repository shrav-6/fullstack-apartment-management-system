const service = require('../../Service/Wishlist');
const dataLayer = require('../../Data/WishList');

jest.mock('../../Data/WishList');

describe('getWishlistedListings', () => {
  it('should return wishlisted listings for the authenticated user', async () => {
    // Mock data and request object
    const mockUser = { id: 'user123' };
    const mockRequest = { user: mockUser };
    const mockWishlists = [{ listingId: '123' }];
    const mockUniqueListingIds = ['123'];
    const mockListings = [
      {
        id: '123',
        unitAvailable: true,
        address: '123 Main St',
        building: { buildingName: 'Example Building' },
        rent: 1000,
        pets: 'Allowed',
        startsFrom: '2023-01-01',
        description: 'A beautiful listing',
        extras: 'Some extras',
      },
    ];

    // Set up data layer mocks
    dataLayer.getUserWishlists.mockResolvedValue(mockWishlists);
    dataLayer.getUniqueListingIds.mockResolvedValue(mockUniqueListingIds);
    dataLayer.getListingsByUniqueIds.mockResolvedValue(mockListings);

    // Set up response object
    const res = mockResponse();

    // Call the function
    await service.getWishlistedListings(mockRequest, res);

    // Assertions
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Retrieved successfully',
      data: [
        {
          id: '123',
          unitAvailable: true,
          address: '123 Main St',
          buildingName: 'Example Building',
          rent: 1000,
          pets: 'Allowed',
          startsFrom: '2023-01-01',
          description: 'A beautiful listing',
          extras: 'Some extras',
        },
      ],
    });
  });

 

  it('should handle errors when getUserWishlists fails', async () => {
    // Mock data and request object
    const mockUser = { id: 'user123' };
    const mockRequest = { user: mockUser };
  
    // Set up data layer mocks for an error scenario
    dataLayer.getUserWishlists.mockRejectedValue(new Error('Database error'));
  
    // Set up response object
    const res = mockResponse();
  
    // Call the function
    await service.getWishlistedListings(mockRequest, res);
  
    // Assertions for handling errors
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: 'An error occurred while retrieving data',
    });
  });
  
  it('should handle errors when getUniqueListingIds fails', async () => {
    // Mock data and request object
    const mockUser = { id: 'user123' };
    const mockRequest = { user: mockUser };
    const mockWishlists = [{ listingId: '123' }];
  
    // Set up data layer mocks for an error scenario
    dataLayer.getUserWishlists.mockResolvedValue(mockWishlists);
    dataLayer.getUniqueListingIds.mockRejectedValue(new Error('Database error'));
  
    // Set up response object
    const res = mockResponse();
  
    // Call the function
    await service.getWishlistedListings(mockRequest, res);
  
    // Assertions for handling errors
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: 'An error occurred while retrieving data',
    });
  });
  
  it('should handle errors when getListingsByUniqueIds fails', async () => {
    // Mock data and request object
    const mockUser = { id: 'user123' };
    const mockRequest = { user: mockUser };
    const mockWishlists = [{ listingId: '123' }];
    const mockUniqueListingIds = ['123'];
  
    // Set up data layer mocks for an error scenario
    dataLayer.getUserWishlists.mockResolvedValue(mockWishlists);
    dataLayer.getUniqueListingIds.mockResolvedValue(mockUniqueListingIds);
    dataLayer.getListingsByUniqueIds.mockRejectedValue(new Error('Database error'));
  
    // Set up response object
    const res = mockResponse();
  
    // Call the function
    await service.getWishlistedListings(mockRequest, res);
  
    // Assertions for handling errors
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: 'An error occurred while retrieving data',
    });
  });
  
  
});

describe('addWishlistItem', () => {
  it('should add a wishlist item for the authenticated user', async () => {
    // Mock data and request object
    const mockRequest = {
      body: { listingId: '123', status: true },
      user: { id: 'user123' },
    };

    const mockListing = {
      id: '123',
      // Add other listing properties as needed
    };

    // Set up data layer mocks
    dataLayer.findListingById.mockResolvedValue(mockListing);
    dataLayer.createWishlistItem.mockResolvedValue();

    // Set up response object
    const res = mockResponse();

    // Call the function
    await service.addWishlistItem(mockRequest, res);

    // Assertions
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Successfully wishlisted',
    });
  });

  it('should handle errors when listing is not found', async () => {
    // Mock data and request object
    const mockRequest = {
      body: { listingId: '123', status: true },
      user: { id: 'user123' },
    };

    // Set up data layer mocks for a non-existent listing
    dataLayer.findListingById.mockResolvedValue(null);

    // Set up response object
    const res = mockResponse();

    // Call the function
    await service.addWishlistItem(mockRequest, res);

    // Assertions for a non-existent listing
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: 'Listing not found or invalid status',
    });
  });

  it('should handle errors when createWishlistItem fails', async () => {
    // Mock data and request object
    const mockRequest = {
      body: { listingId: '123', status: true },
      user: { id: 'user123' },
    };
    const mockListing = {
      id: '123',
      // Add other listing properties as needed
    };
  
    // Set up data layer mocks for an error scenario
    dataLayer.findListingById.mockResolvedValue(mockListing);
    dataLayer.createWishlistItem.mockRejectedValue(new Error('Database error'));
  
    // Set up response object
    const res = mockResponse();
  
    // Call the function
    await service.addWishlistItem(mockRequest, res);
  
    // Assertions for handling errors
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: 'An error occurred while processing the request',
    });
  });
  
  it('should handle errors when findListingById returns null', async () => {
    // Mock data and request object
    const mockRequest = {
      body: { listingId: '123', status: true },
      user: { id: 'user123' },
    };
  
    // Set up data layer mocks for a non-existent listing
    dataLayer.findListingById.mockResolvedValue(null);
  
    // Set up response object
    const res = mockResponse();
  
    // Call the function
    await service.addWishlistItem(mockRequest, res);
  
    // Assertions for a non-existent listing
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: 'Listing not found or invalid status',
    });
  });
  
});

describe('removeWishlistItem', () => {
  it('should handle errors when removeWishlistItem fails', async () => {
    // Mock data and request object
    const mockRequest = {
      body: { listingId: '123' },
      user: { id: 'user123' },
    };
    const mockWishlistItem = {
      // Mock wishlist item properties
    };
  
    // Set up data layer mocks for an error scenario
    dataLayer.findWishlistItem.mockResolvedValue(mockWishlistItem);
    dataLayer.removeWishlistItem.mockRejectedValue(new Error('Database error'));
  
    // Set up response object
    const res = mockResponse();
  
    // Call the function
    await service.removeWishlistItem(mockRequest, res);
  
    // Assertions for handling errors
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: 'An error occurred while processing the request',
    });
  });
  
  it('should handle errors when findWishlistItem returns null', async () => {
    // Mock data and request object
    const mockRequest = {
      body: { listingId: '123' },
      user: { id: 'user123' },
    };
  
    // Set up data layer mocks for a non-existent wishlist item
    dataLayer.findWishlistItem.mockResolvedValue(null);
  
    // Set up response object
    const res = mockResponse();
  
    // Call the function
    await service.removeWishlistItem(mockRequest, res);
  
    // Assertions for a non-existent wishlist item
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: 'Wishlist item not found or unauthorized to delete',
    });
  });
  

  it('should remove a wishlist item for the authenticated user', async () => {
    // Mock data and request object
    const mockRequest = {
      body: { listingId: '123' },
      user: { id: 'user123' },
    };

    const mockWishlistItem = {
      // Mock wishlist item properties
    };

    // Set up data layer mocks
    dataLayer.findWishlistItem.mockResolvedValue(mockWishlistItem);
    dataLayer.removeWishlistItem.mockResolvedValue();

    // Set up response object
    const res = mockResponse();

    // Call the function
    await service.removeWishlistItem(mockRequest, res);

    // Assertions
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Successfully removed from wishlist',
    });
  });

  it('should handle errors when wishlist item is not found', async () => {
    // Mock data and request object
    const mockRequest = {
      body: { listingId: '123' },
      user: { id: 'user123' },
    };

    // Set up data layer mocks for a non-existent wishlist item
    dataLayer.findWishlistItem.mockResolvedValue(null);

    // Set up response object
    const res = mockResponse();

    // Call the function
    await service.removeWishlistItem(mockRequest, res);

    // Assertions for a non-existent wishlist item
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: 'Wishlist item not found or unauthorized to delete',
    });
  });
  
  
});

// Mock Express response object
function mockResponse() {
  const res = {};
  res.json = jest.fn().mockReturnValue(res);
  return res;
}
it('should handle errors when removeWishlistItem fails', async () => {
  // Mock data and request object
  const mockRequest = {
    body: { listingId: '123' },
    user: { id: 'user123' },
  };
  const mockWishlistItem = {
    // Mock wishlist item properties
  };

  // Set up data layer mocks for an error scenario
  dataLayer.findWishlistItem.mockResolvedValue(mockWishlistItem);
  dataLayer.removeWishlistItem.mockRejectedValue(new Error('Database error'));

  // Set up response object
  const res = mockResponse();

  // Call the function
  await service.removeWishlistItem(mockRequest, res);

  // Assertions for handling errors
  expect(res.json).toHaveBeenCalledWith({
    success: false,
    error: 'An error occurred while processing the request',
  });
});
