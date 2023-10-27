import { http } from '../../../services/http';
import { noticesService } from '../../../services/urls';

export const getAllNotices = () => http.get(noticesService.getAllNotices);
