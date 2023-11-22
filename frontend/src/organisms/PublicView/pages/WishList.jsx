import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoomWishlist from '../components/RoomWishlist';// Import your Listing component

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      // Assume you have the user's access token stored in sessionStorage
      const accessToken = JSON.parse(sessionStorage.getItem('userCred'))?.token;

      // Make a request to get the user's wishlist using the access token
      const wishlistResponse = await axios.get('http://localhost:3001/wishlist/get', {
        headers: {
          accessToken,
        },
      });

      // Update the state with the wishlist data
      setWishlist(wishlistResponse.data.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      // Set loading to false when the request is complete
      setLoading(false);
    }
  };

  useEffect(() => {
    // Call the fetchWishlist function
    fetchWishlist();
  }, []); // The empty dependency array ensures the effect runs only once after the initial render
  const heading = 'WishList Page';
  return (
    <div>
      <h1
        style={{
          textTransform: 'capitalize',
          fontWeight: 600,
          paddingTop: '40px',
        }}
      >{heading}
      </h1>
      {loading ? (
        <p>Loading wishlist...</p>
      ) : (
        <div style={{ display: 'flex', width: '60%' }}>
          {!wishlist?.length ? (
            <p>Your wishlist is empty.</p>
          ) : (
            wishlist?.map((item, index) => (
              <RoomWishlist key={index} item={item} isWishList fetchWishlist={fetchWishlist} />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
