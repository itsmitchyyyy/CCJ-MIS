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
import StudentRepository from '../interface/repositories/student.repository';
import studentProvider from './providers/student.provider';
import AttendanceRepository from '../interface/repositories/attendance.repository';
import attendanceProvider from './providers/attendance.provider';

const httpAdapter = new HttpAxiosAdapter(axiosInstance);

const authRepository = new AuthRepository(httpAdapter);
const adminRepository = new AdminRepository(httpAdapter);
const teacherRepository = new TeacherRepository(httpAdapter);
const subjectRepository = new SubjectRepository(httpAdapter);
const studentRepository = new StudentRepository(httpAdapter);
const attendanceRepository = new AttendanceRepository(httpAdapter);

export default {
  authProvider: authProvider({ authRepository }),
  adminProvider: adminProvider({ adminRepository }),
  teacherProvider: teacherProvider({ teacherRepository }),
  subjectProvider: subjectProvider({ subjectRepository }),
  studentProvider: studentProvider({ studentRepository }),
  attendanceProvider: attendanceProvider({ attendanceRepository }),
};
