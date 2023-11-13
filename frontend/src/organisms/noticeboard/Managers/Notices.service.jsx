import axios from 'axios';
import { http } from '../../../services/http';
import { noticesService } from '../../../services/urls';


// export async function createNotice(data) {
//   try {
//     const response = await axios.post(`${baseUrl}/`, data);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

// export async function getNoticeById(id) {
//   try {
//     const response = await axios.get(`${baseUrl}/${id}`);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

export async function getAllNotices() {
  try {
    const response = await axios.get('http://localhost:3001/Notices',
      {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      }
    );
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// export async function editNotice(id, data) {
//   try {
//     const response = await axios.put(`${baseUrl}/${id}`, data);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

// export async function deleteNotice(id) {
//   try {
//     const response = await axios.delete(`${baseUrl}/${id}`);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }
