import { User, UserStatus } from '../entities/user.entity';

export type FetchStudentsResponseDTO = User;

export type FetchStudentsQueryParams = {
  status?: UserStatus;
};
