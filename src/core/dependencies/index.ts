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
import DocumentRepository from '../interface/repositories/document.repository';
import documentProvider from './providers/document.provider';
import AssignmentRepository from '../interface/repositories/assignment.repository';
import assignmentProvider from './providers/assignment.provider';
import FacilityRepository from '../interface/repositories/facility.repository';
import facilityProvider from './providers/facility.provider';
import AnnouncementRepository from '../interface/repositories/announcement.repository';
import announcementProvider from './providers/announcement.provider';
import SettingsRepository from '../interface/repositories/settings.repository';
import settingsProvider from './providers/settings.provider';
import MessageRepository from '../interface/repositories/message.repository';
import messageProvider from './providers/message.provider';
import NotificationRepository from '../interface/repositories/notification.repository';
import notificationProvider from './providers/notification.provider';

const httpAdapter = new HttpAxiosAdapter(axiosInstance);

const authRepository = new AuthRepository(httpAdapter);
const adminRepository = new AdminRepository(httpAdapter);
const teacherRepository = new TeacherRepository(httpAdapter);
const subjectRepository = new SubjectRepository(httpAdapter);
const studentRepository = new StudentRepository(httpAdapter);
const attendanceRepository = new AttendanceRepository(httpAdapter);
const documentRepository = new DocumentRepository(httpAdapter);
const assignmentRepository = new AssignmentRepository(httpAdapter);
const facilityRepository = new FacilityRepository(httpAdapter);
const announcementRepository = new AnnouncementRepository(httpAdapter);
const settingsRepository = new SettingsRepository(httpAdapter);
const messageRepository = new MessageRepository(httpAdapter);
const notificationRepository = new NotificationRepository(httpAdapter);

export default {
  authProvider: authProvider({ authRepository }),
  adminProvider: adminProvider({ adminRepository }),
  teacherProvider: teacherProvider({ teacherRepository }),
  subjectProvider: subjectProvider({ subjectRepository }),
  studentProvider: studentProvider({ studentRepository }),
  attendanceProvider: attendanceProvider({ attendanceRepository }),
  documentProvider: documentProvider({ documentRepository }),
  assignmentProvider: assignmentProvider({ assignmentRepository }),
  facilityProvider: facilityProvider({ facilityRepository }),
  announcementProvider: announcementProvider({ announcementRepository }),
  settingsProvider: settingsProvider({ settingsRepository }),
  messageProvider: messageProvider({ messageRepository }),
  notificationProvider: notificationProvider({ notificationRepository }),
};
