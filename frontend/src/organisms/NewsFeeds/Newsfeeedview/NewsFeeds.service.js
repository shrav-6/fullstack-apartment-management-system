// import axios from 'axios';
import { newsfeedService } from '../../../services/urls';
import { http } from '../../../services/http';

export const getAllNewsfeed = () => http.get(newsfeedService.getAllNewsfeed);
export const editAllNewsfeed = (id, payload) => http.put(newsfeedService.editAllNewsfeed.replace(':id', id), payload);
export const deleteNewfeed = (id, payload) => http.delete(newsfeedService.deleteNewfeed.replace(':id', id), payload);
export const postAllNewsfeed = payload => http.post(newsfeedService.postAllNewsfeed, payload);
export const getAllNewsfeedForManager = buildingId => http.get(newsfeedService.getAllNewsfeedForManager.replace(':buildingId', buildingId));
