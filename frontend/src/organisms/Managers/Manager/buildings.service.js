// import axios from 'axios';
import { buildingService } from '../../../services/urls';
import { http } from '../../../services/http';

export const getAllBuilding = () => http.get(buildingService.getAllBuilding);
export const postAllBuilding = payload => http.post(buildingService.postAllBuilding, payload);
// export const getAllNoticesForManager = buildingId => http.get(noticesService.getAllNoticesForManager.replace(':buildingId', buildingId));
