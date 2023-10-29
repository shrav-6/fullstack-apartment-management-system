import axios from 'axios';
import { http } from '../../../services/http';
import { noticesService } from '../../../services/urls';

export const getAllNotices = () => axios.get(noticesService.getAllNotices);
