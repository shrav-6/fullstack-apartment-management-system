/* eslint-disable no-console */
// fetchData.js
import axios from 'axios';

const fetchData = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get('http://localhost:3001/Listings/all', {
      headers: {
        accessToken: sessionStorage.getItem('accessToken'),
      },
    });
    console.log(response.data);
    if (response.status === 200) {
      return response.data; // Return the data if the response status is 200 (OK).
    }
    throw new Error(`API request failed with status: ${response.status}`);
  } catch (error) {
    throw error;
  }
};

export default fetchData;
