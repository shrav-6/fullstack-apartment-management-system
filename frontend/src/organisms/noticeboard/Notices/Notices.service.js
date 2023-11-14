import axios from 'axios';
import { noticesService } from '../../../services/urls';

export const getAllNotices = () => axios.get(noticesService.getAllNotices);
export const editAllNotices = (id, payload) => axios.put(noticesService.editAllNotices.replace(':id', id), payload);
export const deleteNotice = (id, payload) => axios.delete(noticesService.editAllNotices.replace(':id', id), payload);
export const postAllNotices = payload => axios.post(noticesService.postAllNotices, payload);
