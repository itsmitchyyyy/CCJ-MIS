import { axiosInstance } from '@/lib/axios';
import HttpAxiosAdapter from '../interface/adapters/http.axios.adapter';
import AuthRepository from '../interface/repositories/auth.repository';
import authProvider from './providers/auth.provider';
import AdminRepository from '../interface/repositories/admin.repository';
import adminProvider from './providers/admin.provider';

const httpAdapter = new HttpAxiosAdapter(axiosInstance);

const authRepository = new AuthRepository(httpAdapter);
const adminRepository = new AdminRepository(httpAdapter);

export default {
  authProvider: authProvider({ authRepository }),
  adminProvider: adminProvider({ adminRepository }),
};
