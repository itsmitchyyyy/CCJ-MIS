import {
  AnnouncementStatus,
  AnnouncementType,
} from '@/features/announcement/types';
import { UploadFile } from 'antd';

export type StoreAnnouncementDTO = {
  title: string;
  description: string;
  posted_by_id: string;
  images?: UploadFile[];
  status?: AnnouncementStatus;
  type: AnnouncementType;
};

export type AnnouncementQuery = {
  type?: AnnouncementType;
};
