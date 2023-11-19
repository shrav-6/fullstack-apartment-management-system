import axios from 'axios';

export async function getAllNotices() {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(
      'http://172.17.0.237:8074/Notices',
      {
        headers: {
          accessToken: sessionStorage.getItem('accessToken'),
        },
      },
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
}
