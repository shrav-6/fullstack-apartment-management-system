// import axios from 'axios';
import { noticesService } from '../../../services/urls';
import { http } from '../../../services/http';

export const getAllNotices = () => http.get(noticesService.getAllNotices);
export const editAllNotices = (id, payload) => http.put(noticesService.editAllNotices.replace(':id', id), payload);
export const deleteNotice = id => http.delete(noticesService.deleteNotice.replace(':id', id));
export const postAllNotices = payload => http.post(noticesService.postAllNotices, payload);
export const getAllNoticesForManager = buildingId => http.get(noticesService.getAllNoticesForManager.replace(':buildingId', buildingId));
