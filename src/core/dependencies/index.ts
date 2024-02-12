import { axiosInstance } from '@/lib/axios';
import HttpAxiosAdapter from '../interface/adapters/http.axios.adapter';
import AuthRepository from '../interface/repositories/auth.repository';
import authProvider from './providers/auth.provider';

const httpAdapter = new HttpAxiosAdapter(axiosInstance);

const authRepository = new AuthRepository(httpAdapter);

export default {
  authProvider: authProvider({ authRepository }),
};
