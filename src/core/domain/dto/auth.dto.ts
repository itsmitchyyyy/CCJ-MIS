import { ApiErrorDTO } from './error.dto';

export type LoginData = {
  user: {
    id: string;
    first_name: string;
    last_name: string;
    contact_number: string;
    username: string;
    profile_picture: string;
    access_type: string;
    status: string;
    email: string;
    created_at: Date;
    updated_at: Date;
  };
  token: string;
};

export type LoginDTO = {
  username: string;
  password: string;
};

export type LoginSuccessDTO = {
  errors?: ApiErrorDTO[];
} & LoginData;

export type RegisterDTO = {
  first_name: string;
  last_name: string;
  contact_number: string;
  username: string;
  access_type: string;
  status: string;
  email: string;
  password_confirmation: string;
};
