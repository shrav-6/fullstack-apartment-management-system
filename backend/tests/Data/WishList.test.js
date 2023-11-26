
const dataLayer = require('../../data/WishList'); 
const { wishlists, listings, buildings } = require("../../models");
/**
 * Test suite for wishlist functionalities in the data layer.
 */


jest.mock("../../models");
/**
 * Test to verify retrieval of user wishlists with associated listings and buildings.
 * Checks if wishlists for a specific user can be fetched along with related listing and building data.
 */
it('should retrieve user wishlists with associated listings and buildings', async () => {
    wishlists.findAll.mockResolvedValue([{ id: 1, listingId: 2 }]); // Mock wishlists
    listings.findAll.mockResolvedValue([{ id: 2, buildingId: 3 }]); // Mock listings
  
    const result = await dataLayer.getUserWishlists(123); // Example userId
    expect(result).toEqual(expect.any(Array));
  });
  
  /**
 * Test to check behavior when no wishlists are found for a user.
 * Ensures that an empty array is returned if no wishlists exist for the specified user.
 */
  it('should return an empty array if no wishlists are found', async () => {
    wishlists.findAll.mockResolvedValue([]);
  
    const result = await dataLayer.getUserWishlists(123);
    expect(result).toEqual([]);
  });
  
  /**
 * Test to verify retrieval of listings by unique IDs.
 * Checks if the function correctly fetches listings based on an array of unique listing IDs.
 */
  it('should retrieve listings by unique IDs', async () => {
    listings.findAll.mockResolvedValue([{ id: 1 }, { id: 2 }]);
  
    const result = await dataLayer.getListingsByUniqueIds([1, 2]);
    expect(result).toEqual(expect.any(Array));
  });
 
  /**
 * Test to verify the creation of a wishlist item.
 * Ensures that a wishlist item can be successfully created for a user.
 */
  it('should create a wishlist item', async () => {
    wishlists.create.mockResolvedValue({ id: 1, userId: 123, listingId: 2, status: true });
  
    const result = await dataLayer.createWishlistItem(123, 2, true);
    expect(result).toEqual(expect.any(Object));
  });

  /**
 * Test to verify finding a listing by its ID.
 * Checks if the function can successfully retrieve a listing based on its ID.
 */
  it('should find a listing by its ID', async () => {
    listings.findOne.mockResolvedValue({ id: 1 });
  
    const result = await dataLayer.findListingById(1);
    expect(result).toEqual(expect.any(Object));
  });

  /**
 * Test to verify finding a wishlist item by user ID and listing ID.
 * Checks if the function can locate a specific wishlist item based on user and listing IDs.
 */
  it('should find a wishlist item by user ID and listing ID', async () => {
    wishlists.findOne.mockResolvedValue({ id: 1, userId: 123, listingId: 2 });
  
    const result = await dataLayer.findWishlistItem(123, 2);
    expect(result).toEqual(expect.any(Object));
  });
      
  /**
 * Test to verify the removal of a wishlist item.
 * Ensures that a specific wishlist item can be successfully deleted.
 */
  it('should remove a wishlist item', async () => {
    wishlists.destroy.mockResolvedValue(1);
  
    await dataLayer.removeWishlistItem(123, 2);
    expect(wishlists.destroy).toHaveBeenCalledWith({ where: { listingId: 2, userId: 123 } });
  });
  


/**
 * Test to handle errors during wishlist item creation.
 * Verifies that the function throws an error in case of database issues during the creation process.
 */
  it('should handle errors during wishlist item creation', async () => {
    wishlists.create.mockRejectedValue(new Error('Database error'));
  
    await expect(dataLayer.createWishlistItem(123, 2, true)).rejects.toThrow('Database error');
  });

  /**
 * Test to check behavior when a listing is not found by its ID.
 * Ensures that the function returns null if the specified listing does not exist.
 */
  it('should return null if the listing is not found', async () => {
    listings.findOne.mockResolvedValue(null);
  
    const result = await dataLayer.findListingById(999);
    expect(result).toBeNull();
  });

  /**
 * Test to handle errors when finding a listing by ID.
 * Verifies that the function throws an error in case of database issues during the search process.
 */
  it('should handle errors when finding a listing by ID', async () => {
    listings.findOne.mockRejectedValue(new Error('Database error'));
  
    await expect(dataLayer.findListingById(1)).rejects.toThrow('Database error');
  });

  /**
 * Test to verify behavior when a wishlist item is not found.
 * Ensures that the function returns null if the specified wishlist item does not exist.
 */
  it('should return null if the wishlist item is not found', async () => {
    wishlists.findOne.mockResolvedValue(null);
  
    const result = await dataLayer.findWishlistItem(123, 999);
    expect(result).toBeNull();
  });
  