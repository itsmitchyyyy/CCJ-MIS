import { axiosInstance } from '@/lib/axios';
import HttpAxiosAdapter from '../interface/adapters/http.axios.adapter';
import AuthRepository from '../interface/repositories/auth.repository';
import authProvider from './providers/auth.provider';
import AdminRepository from '../interface/repositories/admin.repository';
import adminProvider from './providers/admin.provider';
import TeacherRepository from '../interface/repositories/teacher.repository';
import teacherProvider from './providers/teacher.provider';
import SubjectRepository from '../interface/repositories/subject.repository';
import subjectProvider from './providers/subject.provider';

const httpAdapter = new HttpAxiosAdapter(axiosInstance);

const authRepository = new AuthRepository(httpAdapter);
const adminRepository = new AdminRepository(httpAdapter);
const teacherRepository = new TeacherRepository(httpAdapter);
const subjectRepository = new SubjectRepository(httpAdapter);

export default {
  authProvider: authProvider({ authRepository }),
  adminProvider: adminProvider({ adminRepository }),
  teacherProvider: teacherProvider({ teacherRepository }),
  subjectProvider: subjectProvider({ subjectRepository }),
};
