
const dataLayer = require('../../Data/WishList'); 
const { wishlists, listings, buildings } = require("../../Models");

jest.mock("../../Models");
it('should retrieve user wishlists with associated listings and buildings', async () => {
    wishlists.findAll.mockResolvedValue([{ id: 1, listingId: 2 }]); // Mock wishlists
    listings.findAll.mockResolvedValue([{ id: 2, buildingId: 3 }]); // Mock listings
  
    const result = await dataLayer.getUserWishlists(123); // Example userId
    expect(result).toEqual(expect.any(Array));
  });
  
  it('should return an empty array if no wishlists are found', async () => {
    wishlists.findAll.mockResolvedValue([]);
  
    const result = await dataLayer.getUserWishlists(123);
    expect(result).toEqual([]);
  });

  it('should retrieve listings by unique IDs', async () => {
    listings.findAll.mockResolvedValue([{ id: 1 }, { id: 2 }]);
  
    const result = await dataLayer.getListingsByUniqueIds([1, 2]);
    expect(result).toEqual(expect.any(Array));
  });

  it('should create a wishlist item', async () => {
    wishlists.create.mockResolvedValue({ id: 1, userId: 123, listingId: 2, status: true });
  
    const result = await dataLayer.createWishlistItem(123, 2, true);
    expect(result).toEqual(expect.any(Object));
  });
  it('should find a listing by its ID', async () => {
    listings.findOne.mockResolvedValue({ id: 1 });
  
    const result = await dataLayer.findListingById(1);
    expect(result).toEqual(expect.any(Object));
  });
  it('should find a wishlist item by user ID and listing ID', async () => {
    wishlists.findOne.mockResolvedValue({ id: 1, userId: 123, listingId: 2 });
  
    const result = await dataLayer.findWishlistItem(123, 2);
    expect(result).toEqual(expect.any(Object));
  });
      
  it('should remove a wishlist item', async () => {
    wishlists.destroy.mockResolvedValue(1);
  
    await dataLayer.removeWishlistItem(123, 2);
    expect(wishlists.destroy).toHaveBeenCalledWith({ where: { listingId: 2, userId: 123 } });
  });
  

  
  it('should handle errors during wishlist item creation', async () => {
    wishlists.create.mockRejectedValue(new Error('Database error'));
  
    await expect(dataLayer.createWishlistItem(123, 2, true)).rejects.toThrow('Database error');
  });
  it('should handle errors during wishlist item creation', async () => {
    wishlists.create.mockRejectedValue(new Error('Database error'));
  
    await expect(dataLayer.createWishlistItem(123, 2, true)).rejects.toThrow('Database error');
  });
  it('should return null if the listing is not found', async () => {
    listings.findOne.mockResolvedValue(null);
  
    const result = await dataLayer.findListingById(999);
    expect(result).toBeNull();
  });
  it('should handle errors when finding a listing by ID', async () => {
    listings.findOne.mockRejectedValue(new Error('Database error'));
  
    await expect(dataLayer.findListingById(1)).rejects.toThrow('Database error');
  });

  it('should return null if the wishlist item is not found', async () => {
    wishlists.findOne.mockResolvedValue(null);
  
    const result = await dataLayer.findWishlistItem(123, 999);
    expect(result).toBeNull();
  });
  